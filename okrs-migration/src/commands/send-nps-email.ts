import assert from "assert";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { Context } from "./common.js";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { readFile, writeFile } from "fs/promises";
import Pg from "pg";
import Handlebars from "handlebars";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import nodemailer, { SendMailOptions, SentMessageInfo } from "nodemailer";
import readline from "readline";
import events from "events";
import { notSure, spinningRun } from "../util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default ({ program, sdk, companyId }: Context) => {
  program
    .command('send-nps-email')
    .description('Send NPS form emails to all users')
    .argument('[list]', 'mailing list file')
    .requiredOption('--log <log>', 'log file')
    .option('--limit <limit>', 'max number of users to send emails to', value => parseInt(value, 10), Infinity)
    .option('--no-sync', 'do not sync with database', true)
    .option('--external', 'send to clients instead of Bud employees', false)
    .action(async (mailingListFile, options) => {
      try {
        await sendNpsEmail({
          mailingListFile: join(process.cwd(), mailingListFile),
          logFile: join(process.cwd(), options.log),
          limit: options.limit,
          sync: options.sync,
          external: options.external,
        })
      } catch (err) {
        if (err instanceof assert.AssertionError) {
          console.error(chalk.redBright(err.message))
          process.exit(1)
        } else {
          throw err
        }
      }
    })
}

interface Args {
  mailingListFile: string;
  logFile: string;
  limit: number;
  sync: boolean;
  external: boolean;
}

interface UserRow {
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: unknown;
}

interface MailingTarget {
  user: UserRow;
  receipt: SentMessageInfo | null;
  sent: boolean;
}

type MailingList = Record<string, MailingTarget>;

async function readLog(logFile: string): Promise<Record<string, boolean>> {

  if (!existsSync(logFile)) {
    return {};
  }

  const log: Record<string, boolean> = {};

  const reader = readline.createInterface({
    input: createReadStream(logFile, 'utf8'),
    crlfDelay: Infinity
  });

  reader.on('line', line => {
    log[line.trim().toLowerCase()] = true;
  });

  await events.once(reader, 'close');

  return log;
}

async function readMailingList(mailingListFile: string, logFile: string): Promise<MailingList> {

  const log = await spinningRun(
    'Reading log',
    readLog(logFile),
  );

  const list: MailingList = await spinningRun(
    'Reading mailing list',
    (async () => (
      existsSync(mailingListFile)
        ? JSON.parse(await readFile(mailingListFile, 'utf8'))
        : {}
    ))()
  );

  const newList: MailingList = {};

  for (const [addr, target] of Object.entries(list)) {
    const email = addr.trim().toLowerCase();
    newList[email] = {
      ...list[addr],
      sent: !!target.receipt || !!target.sent || !!log[addr] || !!log[email]
    }
  }

  return newList;
}

async function queryUsers(external: boolean): Promise<UserRow[]> {
  // TODO: move env vars handling and Postgres connection somewhere else
  const { PG_HOST, PG_PORT, PG_USER, PG_PASSWORD, PG_DATABASE, } = process.env;

  assert(PG_HOST, 'PG_HOST is required');
  assert(PG_PORT, 'PG_PORT is required');
  assert(PG_USER, 'PG_USER is required');
  assert(PG_PASSWORD, 'PG_PASSWORD is required');
  assert(PG_DATABASE, 'PG_DATABASE is required');

  const client = new Pg.Client({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
  });

  await client.connect();

  const { rows } = await client.query(
    `SELECT DISTINCT ON (email) email, * FROM "user" WHERE "status" = 'ACTIVE' 
        AND "email" LIKE '%@%.%' 
        AND "email" ${external ? 'NOT' : ''} LIKE '%@getbud.co' 
        AND "email" NOT LIKE '%+%@getbud.co'
        AND "email" NOT LIKE '%@bud.sandbox'`
  );

  await client.end();

  return rows;
}

async function buildMailingList(mailingListFile: string, logFile: string, sync: boolean, external: boolean): Promise<MailingList> {

  const list = readMailingList(mailingListFile, logFile);

  if (!sync) {
    return list;
  }

  const rows = await spinningRun(
    'Querying users from database',
    queryUsers(external),
  );

  const syncedList = rows.reduce((map, row) => {
    const email = row.email.trim().toLowerCase();
    return {
      ...map,
      email,
      [email]: {
        user: row,
        receipt: list[email]?.receipt || null,
        sent: !!list[email]?.sent || false
      }
    };
  }, {});

  await spinningRun(
    'Saving mailing list',
    writeFile(mailingListFile, JSON.stringify(syncedList, null, 2), 'utf8'),
    `Saved ${Object.values(syncedList).length} users to ${mailingListFile}`
  );

  return syncedList;
}

async function sendNpsEmail({ mailingListFile, logFile, limit, sync, external }: Args): Promise<void> {

  const mailingList = await buildMailingList(mailingListFile, logFile, sync, external);

  // TODO: move env vars handling and Postgres connection somewhere else
  const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD, MAIL_SENDER, MAIL_REPLY_TO, } = process.env;

  assert(MAIL_HOST, 'MAIL_HOST is required');
  assert(MAIL_PORT, 'MAIL_PORT is required');
  assert(MAIL_USER, 'MAIL_USER is required');
  assert(MAIL_PASSWORD, 'MAIL_PASSWORD is required');
  assert(MAIL_SENDER, 'MAIL_SENDER is required');
  assert(MAIL_REPLY_TO, 'MAIL_REPLY_TO is required');

  const template = Handlebars.compile(
    await readFile(resolve(__dirname, '../../templates/nps-form-link.pt-BR.hbs'), "utf8")
  );

  const messages = Object.values(mailingList)
    .filter(({ sent }) => !sent)
    .slice(0, limit)
    .map<SendMailOptions>(({ user }) => ({
      from: MAIL_SENDER,
      sender: MAIL_SENDER,
      replyTo: MAIL_REPLY_TO,
      to: user.email.trim().toLowerCase(),
      subject: "Como está sendo sua experiência com o Bud?",
      html: template({ user })
    }));

  console.debug(messages.map(({ to }) => `- ${to}`).join('\n'));

  if (await notSure(`You are about to send the NPS form email to ${chalk.yellow.bold(messages.length)} users`)) {
    console.log(chalk.yellowBright('Aborted'));
    return;
  }

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(messages.length, 0, { speed: 'N/A' });

  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT),
    secure: MAIL_PORT === '465',
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASSWORD
    },
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
    rateDelta: 3 * 1000,
    rateLimit: 1
  });

  let remainingMessages = messages.length;

  const logStream = createWriteStream(logFile, { flags: 'a' });

  const saveAndExit = async () => {
    await writeFile(mailingListFile, JSON.stringify(mailingList, null, 2), 'utf8');

    logStream.close();
    transporter.close();
    progress.stop();
  };

  const send = async (message: SendMailOptions) => {
    try {
      const receipt = await transporter.sendMail(message);

      for (const addr of receipt.accepted) {
        const email = addr.trim().toLowerCase();
        logStream.write(`${email}\n`);

        mailingList[email].receipt = receipt;
      }

      progress.increment();
    } catch (err) {
      console.error(chalk.redBright(`Failed to send message to ${chalk.bold(JSON.stringify(message.to))} due to: ${err}`));

      throw err;
    }
  };

  transporter.on("idle", async () => {
    const promises: Promise<void>[] = [];

    // send next message from the pending queue
    while (transporter.isIdle() && messages.length > 0) {
      const message = messages.shift()!;

      promises.push(send(message));
    }

    await Promise.all(promises);
    remainingMessages -= promises.length;

    if (remainingMessages === 0) {
      await saveAndExit();
    }
  });

  transporter.on("error", async (err) => {
    await saveAndExit();

    console.error(chalk.redBright(err.message));
    process.exit(1);
  });
}
