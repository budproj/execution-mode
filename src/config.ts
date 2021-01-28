import getNextConfig from 'next/config'

export interface BudConfig {
  publicRuntimeConfig: BudPublicConfig
  serverRuntimeConfig: BudServerConfig
}

export interface BudPublicConfig {
  environment: ENVIRONMENT
  nodeEnv: NodeEnvironment
  defaultLocale: LOCALE
  intlRoutes: Route[]
  logLevel: LogLevel
  api: BudAPIs
  auth0: Auth0Config
  hotjar: HotjarConfig
  mirage: MiragePublicConfig
}

export interface BudServerConfig {
  host: HOST
  supportedLocales: LOCALE[]
}

export enum HOST {
  'local.getbud.co' = 'local.getbud.co',
  'develop.getbud.co' = 'develop.getbud.co',
  'getbud.co' = 'getbud.co',
}

export enum LOCALE {
  'pt-BR' = 'pt-BR',
  'en-US' = 'en-US',
}

export enum ENVIRONMENT {
  local = 'local',
  develop = 'develop',
  production = 'production',
}

export type NodeEnvironment = 'test' | 'development' | 'production'

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'

export interface Route {
  destination: string
  source: string
  locale: LOCALE
}

export interface BudAPIs {
  graphql: string
}

export interface Auth0Config {
  clientID: string
  domain: string
  scope: string
  audience: string
}

export interface HotjarConfig {
  id: number
  sv: number
}

export interface MiragePublicConfig {
  enabled: boolean
  fakerSeed: number
}

const getConfig = (): BudConfig => getNextConfig()

export default getConfig
