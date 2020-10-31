import getNextConfig from 'next/config'

export enum Locale {
  'pt-BR' = 'pt-BR',
  'en-US' = 'en-US',
}

export enum Environment {
  local = 'local',
  develop = 'develop',
  production = 'production',
}

export enum Host {
  'local.getbud.co' = 'local.getbud.co',
  'develop.getbud.co' = 'develop.getbud.co',
  'getbud.co' = 'getbud.co',
}

export interface BudServerConfig {
  host: Host
  supportedLocales: Locale[]
}

export interface BudPublicConfig {
  environment: Environment
  defaultLocale: Locale
}

export interface BudConfig {
  publicRuntimeConfig: BudPublicConfig
  serverRuntimeConfig: BudServerConfig
}

const getConfig = (): BudConfig => getNextConfig()

export default getConfig
