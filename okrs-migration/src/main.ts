import assert from "assert";
import dotenv from "dotenv";
import { writeFile } from "fs/promises";
import cliProgress from "cli-progress";
import buildSdk, { CreateKeyResultInput, CreateObjectiveInput } from "./sdk.js";
import buildDatabase, { Database } from "./database.js";
import { loadCsvs, Okr } from "./okrs-csv-loader.js";
import { KEY_RESULT_FORMAT } from "./model.js";

dotenv.config();

const { AUTH_TOKEN, API_URL, ROOT_TEAM_ID, CSV_OBJECTIVES_FILE, CSV_KEY_RESULTS_FILE } = process.env;
assert.ok(API_URL, "API_URL is required");
assert.ok(AUTH_TOKEN, "AUTH_TOKEN is required");
assert.ok(ROOT_TEAM_ID, "ROOT_TEAM_ID is required");
assert.ok(CSV_OBJECTIVES_FILE, "CSV_OBJECTIVES_FILE is required");
assert.ok(CSV_KEY_RESULTS_FILE, "CSV_KEY_RESULTS_FILE is required");

main({
  apiUrl: API_URL,
  accessToken: AUTH_TOKEN,
  companyId: ROOT_TEAM_ID,
  objectivesCsv: CSV_OBJECTIVES_FILE,
  keyResultsCsv: CSV_KEY_RESULTS_FILE
})
  .then()
  .catch(err => console.error(err));

interface Args {
  accessToken: string;
  apiUrl: string;
  companyId: string;
  objectivesCsv: string;
  keyResultsCsv: string;
}

async function main({ accessToken, apiUrl, companyId, objectivesCsv, keyResultsCsv }: Args) {
  const sdk = await buildSdk({ tokenType: "Bearer", accessToken, apiUrl });

  let database;
  try {
    database = await buildDatabase({ sdk, companyId });
  } catch (err) {
    console.error(JSON.stringify(err, null, 2));
    process.exit(1);
  }

  const items = await loadCsvs(objectivesCsv, keyResultsCsv);

  // Clear PDIs
  if (false) {
    const deletionProgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    deletionProgress.start(
      database.users.all.length,
      0,
      { speed: "N/A" }
    );

    try {
      for (const { id: userId, email } of database.users.all) {
        const data = await sdk.getObjectives({
          ownerId: userId,
          teamId: null,
          active: true
        });

        const objectives = data.me.companies.edges.map(({ node }) => node.objectives.edges.map(({ node }) => node)).flat();

        for (const objective of objectives) {
          if (objective.teamId) {
            assert.fail(`Objective ${objective.id} is not personal`);
          }

          console.log("Deleting objective", objective.id, "from user", email);
          await sdk.deleteOkr({ objectiveID: objective.id });
        }

        deletionProgress.increment();
      }
    } finally {
      deletionProgress.stop();
    }
  } else {
    console.warn("PDIs deletion is disabled");
  }

  const okrs = buildOkrs(database, items);

  await writeFile("./okrs.json", JSON.stringify(okrs.map(okr => ({
    objective: okr.objective,
    keyResults: okr.keyResults.map(kr => kr(""))
  })), null, 2));

  // Create OKRs
  if (false) {
    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    progress.start(
      okrs.reduce((sum, okr) => sum + 1 + okr.keyResults.length, 0),
      0,
      { speed: "N/A" }
    );

    const responses: object[] = [];

    try {
      for (const { objective, keyResults } of okrs) {
        const oResponse = await sdk.createDraftObjective(objective);

        responses.push(oResponse);

        progress.increment();

        for (const keyResult of keyResults) {
          const krResponse = await sdk.createKeyResult(keyResult(oResponse.createObjective.id));

          responses.push(krResponse);

          progress.increment();
        }
      }

      await writeFile(`./responses-${Date.now()}.json`, JSON.stringify(responses, null, 2));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      progress.stop();
    }
  } else {
    console.warn("OKRs migration is disabled");
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
        teamID: team ? teams.byName[team]?.id || null : null
      },
      keyResults: keyResults.map(keyResult => {
        const teamId = keyResult.team ? teams.byName[keyResult.team]?.id || null : null;

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

/*
    "createObjective": {
      "id": "714b8de9-8609-4526-be7a-031e2f2dd3c5",
      "title": "Send a Tesla car to Mars!",
      "cycle": {
        "id": "5d86d61a-9c20-4723-ac68-bfb23afb8272",
        "period": "2023",
        "cadence": "YEARLY",
        "dateEnd": "2023-12-31T03:00:00.000Z"
      },
      "status": {
        "progress": 0,
        "confidence": 100
      },
      "delta": {
        "progress": 0
      },
      "policy": {
        "update": "ALLOW",
        "delete": "ALLOW"
      }
    }
  }
 */
