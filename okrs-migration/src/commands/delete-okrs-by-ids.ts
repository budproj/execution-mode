import assert from "assert";
import read from "read";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { BudSdk } from "../sdk.js";
import { Context } from "./common.js";

export default ({ program, sdk }: Context) => {
  program.command("delete-okrs-by-ids")
    .description("Delete all OKRs of a list of IDs")
    .argument("<string>", "objective(s) ID(s)")
    .action(async ids => {
      try {
        await deleteOkrsByIds({
          sdk,
          ids: ids.split(",")
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
  ids: string[];
}

async function deleteOkrsByIds({ sdk, ids }: Args): Promise<void> {

  console.log(chalk.yellowBright(`You are about to delete ${chalk.yellow.bold(ids.length > 5 ? ids.length : ids.join(","))} OKRs`));

  const areYouSure = await read({
    prompt: "Are you sure you sure? (y/N)"
  });

  if (areYouSure.toLowerCase() !== "y") {
    console.log(chalk.yellowBright("Aborted"));
    return;
  }

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(
    ids.length,
    0,
    { speed: "N/A" }
  );

  try {
    for (const objectiveId of ids) {
      await sdk.deleteOkr({ objectiveID: objectiveId });

      progress.increment();
    }

    progress.stop();

    console.log(chalk.green.bold("OKRs from deleted successfully!"));
  } catch (err) {
    throw err;
  }
}
