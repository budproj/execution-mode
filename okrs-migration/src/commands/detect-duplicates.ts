import assert from "assert";
import { join } from "path";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { createWriteStream } from "fs";
import groupBy from "lodash/groupBy.js";
import { BudSdk } from "../sdk.js";
import buildDatabase from "../database.js";
import { Context } from "./common.js";

export default ({ program, sdk, companyId }: Context) => {
  program.command("detect-duplicates")
    .description("Detect users with duplicate OKRs")
    .option("--output <file>", "output file")
    .action(async options => {
      try {
        await detectDuplicates({
          sdk,
          companyId,
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
  outputFile?: string;
}

async function detectDuplicates({ sdk, companyId, outputFile }: Args): Promise<void> {
  const { users } = await buildDatabase({ sdk, companyId });

  const output = outputFile ? createWriteStream(join(process.cwd(), outputFile)) : null;

  output?.write(["Owner ID", "Email", "Objective ID", "Objective Title", "Created At", "Cycle"].join(",") + "\n");

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(
    users.all.length,
    0,
    { speed: "N/A" }
  );

  try {
    for (const user of users.all) {
      const data = await sdk.getObjectives({
        ownerId: user.id,
        teamId: null,
        active: true
      });

      const objectives = data.me.companies.edges.map(({ node }) => node.objectives.edges.map(({ node }) => node)).flat();

      const groups = groupBy(objectives, obj => `${obj.cycle.id}:${obj.title}`);

      for (const group of Object.values(groups)) {
        const [, ...dups] = group.sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime());
        if (group.length > 1) {
          for (const obj of dups) {
            output?.write([user.id, user.email, obj.id, obj.title, obj.createdAt, obj.cycle.period].join(",") + "\n");
          }
        }
      }

      progress.increment();
    }

    progress.stop();
    output?.end();

    console.log(chalk.green.bold("Users created successfully!"));
  } catch (err) {
    console.error(chalk.bgRed(JSON.stringify(err, null, 2)));

    progress.stop();
  }
}
