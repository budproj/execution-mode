import getNextConfig from 'next/config'

export interface BudConfig {
  publicRuntimeConfig: BudPublicConfig
  serverRuntimeConfig: BudServerConfig
}

export interface BudPublicConfig {
  environment: Environment
  nodeEnv: NodeEnvironment
  defaultLocale: Locale
  intlRoutes: Route[]
  logLevel: LogLevels
  api: BudAPIs
  auth0: Auth0Config
  mirage: MiragePublicConfig
}

export interface BudServerConfig {
  host: Host
  supportedLocales: Locale[]
}

export enum Host {
  'local.getbud.co' = 'local.getbud.co',
  'develop.getbud.co' = 'develop.getbud.co',
  'getbud.co' = 'getbud.co',
}

export enum Locale {
  'pt-BR' = 'pt-BR',
  'en-US' = 'en-US',
}

export enum Environment {
  local = 'local',
  develop = 'develop',
  production = 'production',
}

export type NodeEnvironment = 'test' | 'development' | 'production'

export type LogLevels = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export interface Route {
  destination: string
  source: string
  locale: Locale
}

export interface BudAPIs {
  acl: string
  graphql: string
}

export interface Auth0Config {
  clientID: string
  domain: string
  scope: string
  audience: string
}

export interface MiragePublicConfig {
  enabled: boolean
  fakerSeed: number
}

const getConfig = (): BudConfig => getNextConfig()

export default getConfig
