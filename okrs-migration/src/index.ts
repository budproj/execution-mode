#!/bin/env node

import dotenv from "dotenv";
import assert from "assert";
import read from "read";
import figlet from "figlet";
import chalk from "chalk";
import { program } from "commander";
import auth from "./auth.js";
import buildSdk from "./sdk.js";
import { spinningRun } from "./util.js";
import buildCommands from "./commands/index.js";

dotenv.config();

const { BUD_EMAIL, BUD_PASSWORD, API_URL } = process.env;
assert.ok(API_URL, "API_URL is required");

figlet("bud", {
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true
}, (err, data) => {
  if (err || !data) {
    console.error(err);
    return;
  }

  main(data)
    .then()
    .catch(err => {
      console.error(err);
      console.error(chalk.bgRed(err));

      process.exit(1);
    });
});

async function main(hello: string) {
  console.log(hello);

  const email = BUD_EMAIL || await read({
    prompt: "Email:",
    default: "danilo@getbud.co"
  });

  const password = BUD_PASSWORD || await read({
    prompt: "Password:",
    silent: true,
    replace: "*"
  });

  const { tokenType, accessToken, user } = await auth({
    apiUrl: API_URL!,
    email,
    password
  });

  console.log(chalk.green.bold(`${chalk.blue(user)} authenticated successfully!`));

  const sdk = await spinningRun(
    "Fetching company data",
    buildSdk({
      tokenType,
      accessToken,
      apiUrl: API_URL!
    })
  );

  const company = (await sdk.getMe()).me.companies.edges[0].node;

  console.log(chalk.green.bold(`User belongs to company ${chalk.blue(company.name)}`));

  buildCommands({
    program,
    sdk,
    companyId: company.id
  });

  program.parse();
}
