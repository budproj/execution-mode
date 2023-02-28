import assert from "assert";
import { join } from "path";
import chalk from "chalk";
import read from "read";
import cliProgress from "cli-progress";
import { writeFile } from "fs/promises";
import { BudSdk, CreateKeyResultInput, CreateObjectiveInput } from "../sdk.js";
import buildDatabase, { Database } from "../database.js";
import { loadCsvs, Okr } from "../okrs-csv-loader.js";
import { KEY_RESULT_FORMAT } from "../model.js";
import { Context } from "./common.js";

export default ({ program, sdk, companyId }: Context) => {
  program.command("create-okrs")
    .description("Takes two CSV files and creates OKRs from them")
    .requiredOption("-o, --objectives <file>", "objectives CSV file")
    .requiredOption("-kr, --keyResults <file>", "key results CSV file")
    .option("--output <file>", "output file")
    .action(async options => {
      try {
        await createOkrs({
          sdk,
          companyId,
          objectivesCsv: options.objectives,
          keyResultsCsv: options.keyResults,
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
  objectivesCsv: string;
  keyResultsCsv: string;
  outputFile?: string;
}

async function createOkrs({ sdk, companyId, objectivesCsv, keyResultsCsv, outputFile }: Args): Promise<void> {
  const database = await buildDatabase({ sdk, companyId });

  const items = await loadCsvs(objectivesCsv, keyResultsCsv);

  const okrs = buildOkrs(database, items);

  const osCount = okrs.length;
  const krsCount = okrs.reduce((sum, okr) => sum + okr.keyResults.length, 0);

  console.log(chalk.yellowBright(`You are about to create ${osCount} objectives and ${krsCount} key results`));

  const areYouSure = await read({
    prompt: "Are you sure you sure? (y/N)"
  });

  if (areYouSure.toLowerCase() !== "y") {
    console.log(chalk.yellowBright("Aborted"));
    return;
  }

  const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  progress.start(
    osCount + krsCount,
    0,
    { speed: "N/A" }
  );

  const responses: object[] = [];

  let currentObjective;
  let currentKeyResult;

  try {
    for (const { objective, keyResults } of okrs) {
      currentObjective = objective;

      const oResponse = await sdk.createDraftObjective(objective);

      responses.push(oResponse);

      progress.increment();

      for (const keyResult of keyResults) {
        currentKeyResult = keyResult;

        const krResponse = await sdk.createKeyResult(keyResult(oResponse.createObjective.id));

        responses.push(krResponse);

        progress.increment();
      }
    }

    if (outputFile) {
      await writeFile(join(process.cwd(), outputFile), JSON.stringify(responses, null, 2));
    }

    progress.stop();

    console.log(chalk.green.bold("OKRs created successfully!"));
  } catch (err) {
    console.error(chalk.bgRed(JSON.stringify(err, null, 2)));
    console.error(chalk.bgRed(`Failed objective was ${chalk.redBright.bold(JSON.stringify(currentObjective, null, 2))}`));
    if (currentKeyResult) {
      console.error(chalk.bgRed(`Failed key result was ${chalk.redBright.bold(JSON.stringify(currentKeyResult, null, 2))}`));
    }

    progress.stop();
  }
}

interface OkrMutations {
  objective: CreateObjectiveInput;
  keyResults: ((objectiveId: string) => CreateKeyResultInput)[];
}

function buildOkrs(database: Database, items: Okr[]): OkrMutations[] {
  const { cycles, teams, users } = database;

  return items.map(({ objective, keyResults }) => {
    const [baseKr] = keyResults;
    const team = objective?.team || baseKr.team;

    return {
      objective: {
        title: objective?.title || baseKr.title,
        ownerID: users.byEmail[objective?.owner || baseKr.owner].id,
        cycleID: cycles.byPeriod[objective?.cycle || baseKr.cycle].id,
        teamID: team ? teams.byName[team].id : null
      },
      keyResults: keyResults.map(keyResult => {
        const teamId = keyResult.team ? teams.byName[keyResult.team].id : null;

        const base = {
          title: keyResult.title,
          initialValue: parseValue(keyResult.initialValue, keyResult.format),
          goal: parseValue(keyResult.targetValue, keyResult.format),
          format: keyResult.format,
          ownerID: users.byEmail[keyResult.owner].id,
          teamID: teamId,
          // type: teamId ? KeyResultType.COMPANY : KeyResultType.PERSONAL,
          description: keyResult.description
        };

        return objectiveId => ({
          ...base,
          objectiveID: objectiveId
        });
      })
    };
  });
}

function parseValue(value: string, format: KEY_RESULT_FORMAT) {
  if (!value?.trim()) {
    return 0;
  }

  switch (format) {
    case KEY_RESULT_FORMAT.COIN_BRL:
      return parseFloat(value.replace("R$", "")
        .replace(".", "")
        .replace(",", "."));
    case KEY_RESULT_FORMAT.NUMBER:
      return parseFloat(value);
    case KEY_RESULT_FORMAT.PERCENTAGE:
      return parseFloat(value.replace("%", ""));
    default:
      assert.fail(`Unknown format: ${format}`);
  }
}
