import { Command } from "commander";
import { BudSdk } from "../sdk";

export interface Context {
  program: Command;
  sdk: BudSdk;
  companyId: string;
}
