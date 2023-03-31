import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "assert";
import crypto from "crypto";
import puppeteer from "puppeteer";
import { JSONFile, Low } from "lowdb";
import { spinningRun } from "./util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Args {
  apiUrl: string;
  email: string;
  password: string;
  headless?: boolean;
}

interface Credentials {
  accessToken: string;
  tokenType: string;
  user: string;
  expiresAt: number;
}

interface DbSchema {
  credentials: Record<string, Credentials>;
}

const JWT_KEY = "@@auth0spajs@@::76DivGrWIbmLh7V2SkFyPeIbUFN6OBf3::https://api.getbud.co/business::openid profile email offline_access";

const getDb = async () => {
  const adapter = new JSONFile<DbSchema>(join(__dirname, '../.db'))
  const db = new Low<DbSchema>(adapter)

  await db.read()
  db.data = db.data || { credentials: {} }

  return db;
}

const getKey = ({ apiUrl, email, password }: Args) => {
  const apiUrlHash = crypto.createHash('sha256').update(apiUrl).digest('hex')

  const passwordHash = crypto.createHash('sha256').update(password).digest('hex')

  return `${apiUrlHash}:${email}:${passwordHash}`
}

export default async (args: Args): Promise<Credentials> => {
  const cachedCredentials = await cachedAuth(args)
  if (cachedCredentials) {
    return cachedCredentials
  }

  return await spinningRun(`Authenticating user ${args.email}`, freshAuth(args))
}

export async function cachedAuth(args: Args): Promise<Credentials | null> {
  const db = await getDb()
  const key = getKey(args)

  const cachedCredentials = db.data!.credentials[key]

  if (cachedCredentials) {
    if (Date.now() < cachedCredentials.expiresAt) {
      console.debug("Found cached credentials from previous login");
      return cachedCredentials;
    }

    console.debug("Found cached credentials from previous login, but they have expired");
  }

  return null
}

export async function freshAuth(args: Args): Promise<Credentials> {
  const browser = await puppeteer.launch({
    headless: args.headless,
    args: ['--incognito'],
  })

  const incognito = await browser.createIncognitoBrowserContext();

  const page = await incognito.newPage();

  await page.goto("https://app.getbud.co/");

  await page.waitForNavigation({
    waitUntil: "networkidle0",
    timeout: 30 * 1000
  });

  const emailInput = await page.waitForSelector("#email");
  await emailInput?.type(args.email);

  const passwordInput = await page.waitForSelector('#password')
  await passwordInput?.type(args.password)

  const loginButton = await page.waitForSelector("#btn-login");
  await loginButton?.click();

  // TODO: handle wrong password
  await page.waitForNavigation({
    waitUntil: "networkidle0",
    timeout: 30 * 1000
  });

  const storageValue = await page.evaluate((jwtKey) => window.localStorage.getItem(jwtKey), JWT_KEY);
  assert(storageValue, 'No credentials found');

  const {
    expiresAt,
    body: { access_token, token_type, decodedToken },
  } = JSON.parse(storageValue);

  await incognito.close();
  await browser.close();

  const credentials = {
    accessToken: access_token,
    tokenType: token_type,
    user: decodedToken.user.name,
    expiresAt: expiresAt * 1000,
  }

  const db = await getDb()
  const key = getKey(args)

  db.data!.credentials[key] = credentials
  await db.write()

  return credentials
}
