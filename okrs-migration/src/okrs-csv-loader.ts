import { createReadStream } from "fs";
import assert from "assert";
import path from "path";
import * as csv from "csv";
import groupBy from "lodash/groupBy.js";
import removeAccents from "remove-accents";
import { KEY_RESULT_FORMAT } from "./model.js";

export interface ObjectiveRow {
  title: string;
  cycle: string;
  team: string;
  owner: string;
}

export interface KeyResultRow {
  title: string;
  description: string;
  format: KEY_RESULT_FORMAT;
  targetValue: string;
  initialValue: string;
  cycle: string;
  team: string;
  objective: string;
  owner: string;
}

export interface Okr {
  objective: ObjectiveRow;
  keyResults: KeyResultRow[];
}

function rowValue(row: Record<string, string>, key: string): string {
  const possibleKeys = [key, removeAccents(key)].flatMap(k => [k, `${k}*`]);
  const keyFound = possibleKeys.find(k => typeof row[k] !== "undefined");
  assert(typeof keyFound === "string", `Missing column ${key}`);
  return row[keyFound];
}

export async function loadObjectives(file: string) {
  return new Promise<ObjectiveRow[]>((resolve, reject) => {
    const objectives: ObjectiveRow[] = [];

    // TODO: parameterize
    createReadStream(path.resolve(process.cwd(), file))
      // Transform CSV data into records
      .pipe(csv.parse({
        columns: true,
        skip_empty_lines: true
      }))
      // Transform each value into uppercase
      .pipe(csv.transform(row => {
        return {
          title: rowValue(row, "TÍTULO"),
          cycle: rowValue(row, "CICLO"),
          team: rowValue(row, "TIME"),
          owner: rowValue(row, "DONO")
        };
      }))
      .on("data", data => {
        if (data.title?.trim()) {
          objectives.push(data);
        }
      })
      .on("end", () => {
        resolve(objectives);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

export async function loadKeyResults(file: string) {
  return new Promise<KeyResultRow[]>((resolve, reject) => {
    const keyResults: KeyResultRow[] = [];

    // TODO: parameterize
    createReadStream(path.resolve(process.cwd(), file))
      // Transform CSV data into records
      .pipe(csv.parse({
        columns: true,
        skip_empty_lines: true
      }))
      // Transform each value into uppercase
      .pipe(csv.transform(row => {
        return {
          title: rowValue(row, "TÍTULO"),
          description: rowValue(row, "DESCRIÇÃO"),
          format: rowValue(row, "FORMATO"),
          targetValue: rowValue(row, "META"),
          initialValue: rowValue(row, "VALOR INICIAL"),
          cycle: rowValue(row, "CICLO"),
          team: rowValue(row, "TIME"),
          objective: rowValue(row, "OBJETIVO"),
          owner: rowValue(row, "DONO")
        };
      }))
      .on("data", data => {
        if (data.title?.trim()) {
          keyResults.push(data);
        }
      })
      .on("end", () => {
        resolve(keyResults);
      })
      .on("error", err => {
        reject(err);
      });
  });
}

export async function loadCsvs(objectivesFile: string, keyResultsFile: string): Promise<Okr[]> {

  const [objectives, keyResults] = await Promise.all([
    loadObjectives(objectivesFile),
    loadKeyResults(keyResultsFile)
  ]);

  const byTitleAndOwner = (title: string, owner: string): ObjectiveRow =>
    objectives.find(candidate => candidate.title === title && candidate.owner === owner)!;

  const krGroups = groupBy(keyResults, kr => `${kr.objective}:${kr.owner}`);

  return Object.entries(krGroups).map(([key, krs]) => {
    const [objective, owner] = key.split(":");
    return {
      objective: byTitleAndOwner(objective, owner),
      keyResults: krs
    };
  });
}
