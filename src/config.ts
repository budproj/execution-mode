import getNextConfig from 'next/config'

export enum Locale {
  'pt-BR',
  'en-US',
}

export enum Environment {
  local = 'local',
  develop = 'develop',
  production = 'production',
}

export interface BudPublicConfig {
  environment: Environment
  defaultLocale: Locale
}

export interface BudConfig {
  publicRuntimeConfig: BudPublicConfig
  serverRuntimeConfig: Record<string, unknown>
}

const getConfig = (): BudConfig => getNextConfig()

export default getConfig
