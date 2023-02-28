import { createReadStream } from "fs";
import assert from "assert";
import path from "path";
import * as csv from "csv";
import removeAccents from "remove-accents";
import { USER_GENDER } from "./model.js";

export interface UserRow {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  gender: USER_GENDER;
  team: string;
}

function rowValue(row: Record<string, string>, key: string): string {
  const possibleKeys = [key, removeAccents(key)].flatMap(k => [k, `${k}*`, k.toUpperCase(), `${k.toUpperCase()}*`]);
  const keyFound = possibleKeys.find(k => typeof row[k] !== "undefined");
  assert(typeof keyFound === "string", `Missing column ${key}`);
  return row[keyFound];
}

export async function loadCsv(file: string) {
  return new Promise<UserRow[]>((resolve, reject) => {
    const users: UserRow[] = [];

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
          firstName: rowValue(row, "PRIMEIRO NOME"),
          lastName: rowValue(row, "SOBRENOME"),
          email: rowValue(row, "EMAIL"),
          role: rowValue(row, "PAPEL"),
          gender: rowValue(row, "GÊNERO"),
          team: rowValue(row, "Time")
        };
      }))
      .on("data", data => {
        if (data.email?.trim()) {
          users.push(data);
        }
      })
      .on("end", () => {
        resolve(users);
      })
      .on("error", err => {
        reject(err);
      });
  });
}
