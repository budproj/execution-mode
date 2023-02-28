import assert from "assert";
import { writeFile } from "fs/promises";
import { BudSdk } from "./sdk.js";

interface Args {
  sdk: BudSdk;
  companyId: string;
}

export interface Database {
  companyId: string;

  users: {
    all: any[];
    byEmail: Record<string, any>;
    optionalByEmail: Record<string, any>;
  };
  cycles: {
    byPeriod: Record<string, any>;
  };
  teams: {
    byName: Record<string, any>;
    optionalByName: Record<string, any>;
  };
}

export default async ({ sdk, companyId }: Args): Promise<Database> => {

  const [{ me }, { cycles }, { teams }, { team }] = await Promise.all([
    sdk.getMe(),
    sdk.getCycles(),
    sdk.getTeams(),
    sdk.getTeam(companyId)
  ]);

  await writeFile("./database.json", JSON.stringify({
    me,
    cycles,
    team,
    teams
  }, null, 2));

  const userByEmail = new Proxy({}, {
    get(target, name) {
      const user = typeof name === "string" ? team.users.edges.find(({ node }) => node.email.trim().toLowerCase() === name.trim().toLowerCase()) : null;
      // if (!user) {
      //   console.warn(`User with email "${name.toString()}" not found`);
      //   return {};
      // }
      assert(user, `User "${name.toString()}" not found`);
      return user?.node;
    }
  });

  const teamByName = new Proxy({}, {
    get(target, name) {
      const team = typeof name === "string" ? teams.edges.find(({ node }) => node.name.trim() === name.trim()) : null;
      assert(team, `Team "${name.toString()}" not found`);
      return team?.node;
    }
  });

  return {
    companyId,
    users: {
      get all() {
        return team.users.edges.map(({ node }) => node);
      },
      byEmail: userByEmail,
      optionalByEmail: new Proxy({}, {
        get(target, name) {
          try {
            return userByEmail[name];
          } catch (err) {
            if (err instanceof assert.AssertionError) {
              return null;
            } else {
              throw err;
            }
          }
        }
      })
    },
    cycles: {
      byPeriod: new Proxy({}, {
        get(target, name) {
          const cycle = typeof name === "string" ? cycles.edges.find(({ node }) => node.period.trim() === name.trim()) : null;
          assert(cycle, `Cycle "${name.toString()}" not found. Present cycles are\n${cycles.edges.map(({ node }) => `- ${node.period}`).join("\n")}`);
          return cycle?.node;
        }
      })
    },
    teams: {
      byName: teamByName,
      optionalByName: new Proxy({}, {
        get(target, name) {
          try {
            return teamByName[name];
          } catch (err) {
            if (err instanceof assert.AssertionError) {
              return null;
            } else {
              throw err;
            }
          }
        }
      })
    }
  };
}
