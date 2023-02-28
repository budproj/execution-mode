import path from "path";
import url from "url";
import { readFile } from "fs/promises";
import fetch from "cross-fetch";
import { ApolloClient, gql, InMemoryCache, QueryOptions } from "@apollo/client/core/core.cjs";
import { HttpLink } from "@apollo/client/link/http/http.cjs";
import { MutationOptions } from "@apollo/client/core/watchQueryOptions";
import { KEY_RESULT_FORMAT, KeyResultType, USER_GENDER } from "./model.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface GetObjectivesInput {
  ownerId: string;
  teamId: string | null;
  active: boolean;
}

export interface CreateObjectiveInput {
  title: string;
  teamID: string | null;
  cycleID: string;
  ownerID: string;
}

export interface CreateKeyResultInput {
  title: string;
  initialValue: number;
  goal: number;
  format: KEY_RESULT_FORMAT;
  ownerID: string;
  objectiveID: string;
  teamID: string | null;
  type?: KeyResultType;
  description: string | null;
}

export interface DeleteOkrInput {
  objectiveID: string;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: string | null;
  gender: USER_GENDER;
  teamID: string;
  locale: string | null;
}

// TODO: types
export interface BudSdk {
  getMe(): Promise<any>;

  getCycles(): Promise<any>;

  getTeams(): Promise<any>;

  getTeam(teamId: string): Promise<any>;

  getObjectives(input: GetObjectivesInput): Promise<any>;

  createDraftObjective(input: CreateObjectiveInput): Promise<any>;

  createKeyResult(input: CreateKeyResultInput): Promise<any>;

  deleteOkr(input: DeleteOkrInput): Promise<any>;

  createUser(input: CreateUserInput): Promise<any>;
}

interface Args {
  tokenType: string;
  accessToken: string;
  apiUrl: string;
}

export default async ({ tokenType, accessToken, apiUrl }: Args): Promise<BudSdk> => {

  const client = new ApolloClient({
    link: new HttpLink({
      uri: apiUrl,
      fetch,
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    }),
    cache: new InMemoryCache()
  });

  const loadQuery = async (name: string) => gql`${
    await readFile(path.resolve(__dirname, `../queries/${name}.gql`), "utf8")
  }`;

  const [
    getMe,
    getCycles,
    getTeams,
    getTeam,
    getObjectives,
    createDraftObjective,
    createKeyResult,
    deleteOkr,
    createUser
  ] = await Promise.all([
    loadQuery("get-me"),
    loadQuery("get-cycles"),
    loadQuery("get-teams"),
    loadQuery("get-team"),
    loadQuery("get-user-objectives"),
    loadQuery("create-draft-objective"),
    loadQuery("create-key-result"),
    loadQuery("delete-okr"),
    loadQuery("create-user")
  ]);

  const runQuery = async (options: QueryOptions) => {
    const { data } = await client.query(options);

    return data;
  };

  const runMutation = async (options: MutationOptions) => {
    const { data } = await client.mutate(options);

    return data;
  };

  return {
    getMe: () => runQuery({
      query: getMe
    }),
    getCycles: async () => runQuery({
      query: getCycles
    }),
    getTeams: () => runQuery({
      query: getTeams
    }),
    getTeam: (teamId: string) => runQuery({
      query: getTeam,
      variables: { teamId }
    }),
    getObjectives: async input => runQuery({
      query: getObjectives,
      variables: input
    }),
    createDraftObjective: async input => runMutation({
      mutation: createDraftObjective,
      variables: input
    }),
    createKeyResult: async input => runMutation({
      mutation: createKeyResult,
      variables: input
    }),
    deleteOkr: async input => runMutation({
      mutation: deleteOkr,
      variables: input
    }),
    createUser: async input => runMutation({
      mutation: createUser,
      variables: input
    })
  };
}
