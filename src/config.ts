import getNextConfig from 'next/config'

import { Team } from 'src/components/Team/types'

export interface BudConfig {
  publicRuntimeConfig: BudPublicConfig
  serverRuntimeConfig: BudServerConfig
}

export interface BudPublicConfig {
  environment: ENVIRONMENT
  nodeEnv: NodeEnvironment
  defaultLocale: LOCALE
  noGamificationCompaniesIds: Array<Team['id']>
  intlRoutes: Route[]
  logLevel: LogLevel
  api: BudAPIs
  auth0: Auth0Config
  hotjar: HotjarConfig
  smartlook: SmartlookConfig
  amplitude: AmplitudeConfig
  mirage: MiragePublicConfig
  maintenanceMode: MaintenanceModeConfig
}

export interface BudServerConfig {
  url: string
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
  notifications: string
  routines: string
  restBase: string
}

export interface Auth0Config {
  clientID: string
  domain: string
  scope: string
  audience: string
  apiDomain: string
}

export interface HotjarConfig {
  id: number
  sv: number
}

export interface SmartlookConfig {
  id: string
}

export interface AmplitudeConfig {
  apiKey: string
}

export interface MiragePublicConfig {
  enabled: boolean
  fakerSeed: number
}

export interface MaintenanceModeConfig {
  enabled: boolean
  expectedReturn: Date
}

const getConfig = (): BudConfig => getNextConfig()

export default getConfig
