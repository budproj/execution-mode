import assert from "assert";
import read from "read";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { BudSdk } from "../sdk.js";
import buildDatabase from "../database.js";
import { Context } from "./common.js";

export default ({ program, sdk, companyId }: Context) => {
  program.command("delete-okrs-by-owners")
    .description("Delete all OKRs of a list of users")
    .argument("<string>", "owner(s) email(s)")
    .action(async emails => {
      try {
        await deleteOkrsByOwners({
          sdk,
          companyId,
          emails: emails.split(",")
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
  emails: string[];
}

async function deleteOkrsByOwners({ sdk, companyId, emails }: Args): Promise<void> {
  const database = await buildDatabase({ sdk, companyId });

  console.log(chalk.yellowBright(`You are about to delete ALL individual OKRs from ${chalk.yellow.bold(emails.length > 5 ? emails.length : emails.join(","))} users`));

  const areYouSure = await read({
    prompt: "Are you sure you sure? (y/N)"
  });

  if (areYouSure.toLowerCase() !== "y") {
    console.log(chalk.yellowBright("Aborted"));
    return;
  }

  for (const email of emails) {
    const user = database.users.optionalByEmail[email];
    if (!user) {
      console.log(chalk.yellowBright(`User ${email} not found`));
      continue;
    }

    const data = await sdk.getObjectives({
      ownerId: user.id,
      teamId: null,
      active: true
    });

    const objectives = data.me.companies.edges.map(({ node }) => node.objectives.edges.map(({ node }) => node)).flat();

    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    progress.start(
      objectives.length,
      0,
      { speed: "N/A" }
    );

    try {
      for (const objective of objectives) {
        if (objective.teamId) {
          assert.fail(`Objective ${objective.title}} (${objective.id}) belongs to a team`);
        }

        await sdk.deleteOkr({ objectiveID: objective.id });

        progress.increment();
      }

      progress.stop();

      console.log(chalk.green.bold(`OKRs from ${chalk.blue(email)} deleted successfully!`));
    } catch (err) {
      throw err;
    }
  }
}
