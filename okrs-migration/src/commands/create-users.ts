import assert from "assert";
import { join } from "path";
import read from "read";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { writeFile } from "fs/promises";
import { BudSdk, CreateUserInput } from "../sdk.js";
import buildDatabase, { Database } from "../database.js";
import { loadCsv, UserRow } from "../users-csv-loader.js";
import { Context } from "./common.js";

export default ({ program, sdk, companyId }: Context) => {
  program.command("create-users")
    .description("Takes a CSV files and create users from it")
    .argument("<string>", "CSV file")
    .option("--output <file>", "output file")
    .action(async (csvFile, options) => {
      try {
        await createUsers({
          sdk,
          companyId,
          csvFile,
          outputFile: options.output
        });
      } catch (err) {
        if (err instanceof assert.AssertionError) {
          console.error(chalk.redBright(err.message));
          process.exit(1);
        } else {
          throw err;
        }
      }
    });
};

interface Args {
  sdk: BudSdk;
  companyId: string;
  csvFile: string;
  outputFile?: string;
}

async function createUsers({ sdk, companyId, csvFile, outputFile }: Args): Promise<void> {
  const database = await buildDatabase({ sdk, companyId });

  const items = await loadCsv(csvFile);

  const mutations = buildUsers(database, items);

  console.log(chalk.yellowBright(`You are about to create ${mutations.length} users`));

  const areYouSure = await read({
    prompt: "Are you sure you sure? (y/N)"
  });

  if (areYouSure.toLowerCase() !== "y") {
    console.log(chalk.yellowBright("Aborted"));
    return;
  }

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(
    mutations.length,
    0,
    { speed: "N/A" }
  );

  const responses: object[] = [];

  try {
    for (const mutation of mutations) {
      const response = await sdk.createUser(mutation);

      responses.push(response);

      progress.increment();
    }

    if (outputFile) {
      await writeFile(join(process.cwd(), outputFile), JSON.stringify(responses, null, 2));
    }

    progress.stop();

    console.log(chalk.green.bold("Users created successfully!"));
  } catch (err) {
    console.error(chalk.bgRed(JSON.stringify(err, null, 2)));

    progress.stop();
  }
}

function buildUsers(database: Database, rows: UserRow[]): CreateUserInput[] {
  const { teams, users } = database;

  const mutations: CreateUserInput[] = [];

  for (const row of rows) {
    if (users.optionalByEmail[row.email]) {
      console.log(chalk.yellowBright(`User ${row.email} already exists. Skipping...`));
      continue;
    }

    mutations.push({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      role: row.role,
      gender: row.gender,
      teamID: teams.byName[row.team]?.id ?? database.companyId,
      locale: "pt-BR"
    });
  }

  return mutations;
}
