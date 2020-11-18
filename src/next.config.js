// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const {
  HOST,
  APP_ENV,
  DEFAULT_LOCALE,
  LOCALE_OVERRIDE,
  SUPPORTED_LOCALES,
  NODE_ENV,
  LOG_LEVEL,
  API_ACL_PATH,
  AUTH0_CLIENT_ID_PUBLIC,
  AUTH0_SCOPE,
  AUTH0_DOMAIN,
  MIRAGE_ENABLED,
} = process.env

const publicRuntimeConfig = {
  environment: APP_ENV,
  nodeEnv: NODE_ENV,
  defaultLocale: DEFAULT_LOCALE,
  logLevel: LOG_LEVEL,

  mirage: {
    enabled: Boolean(MIRAGE_ENABLED),
  },

  auth0: {
    clientID: AUTH0_CLIENT_ID_PUBLIC,
    scope: AUTH0_SCOPE,
    domain: AUTH0_DOMAIN,
  },

  api: {
    acl: API_ACL_PATH,
  },
}

const serverRuntimeConfig = {
  host: HOST,
  supportedLocales: SUPPORTED_LOCALES.split(','),
}

const i18n = {
  locales: serverRuntimeConfig.supportedLocales,
  defaultLocale: publicRuntimeConfig.defaultLocale,
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,

  async rewrites() {
    return [
      {
        source: '/pt-BR/resultados-chave',
        destination: '/pt-BR/key-results',
        locale: false,
      },
    ]
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    const libDir = path.join(__dirname, '../lib')
    config.module.rules[0].include.push(libDir)

    return config
  },
}
