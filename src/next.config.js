// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const _ = require('lodash')

const {
  HOST,
  APP_ENV,
  LOCALE_OVERRIDE,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  NODE_ENV,
  LOG_LEVEL,
  API_ACL_PATH,
  API_GRAPHQL,
  AUTH0_CLIENT_ID_PUBLIC,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_AUDIENCE,
  MIRAGE_ENABLED,
} = process.env

const publicRuntimeConfig = {
  environment: APP_ENV,
  nodeEnv: NODE_ENV,
  defaultLocale: LOCALE_OVERRIDE ?? DEFAULT_LOCALE,
  logLevel: LOG_LEVEL,

  mirage: {
    enabled: Boolean(MIRAGE_ENABLED),
  },

  auth0: {
    clientID: AUTH0_CLIENT_ID_PUBLIC,
    domain: AUTH0_DOMAIN,
    scope: AUTH0_SCOPE,
    audience: AUTH0_AUDIENCE,
  },

  api: {
    acl: API_ACL_PATH,
    graphql: API_GRAPHQL,
  },

  intlRoutes: [
    {
      destination: '/key-results',
      source: '/resultados-chave',
      locale: 'pt-BR',
    },
    {
      destination: '/key-results',
      source: '/key-results',
      locale: 'en-US',
    },
  ],
}

const serverRuntimeConfig = {
  host: HOST,
  supportedLocales: [LOCALE_OVERRIDE] ?? SUPPORTED_LOCALES.split(','),
}

const i18n = {
  locales: serverRuntimeConfig.supportedLocales,
  defaultLocale: publicRuntimeConfig.defaultLocale,
  domains: [
    {
      domain: HOST,
      defaultLocale: 'pt-BR',
    },
    {
      domain: `en.${HOST}`,
      defaultLocale: 'en-US',
    }
  ]
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,

  async rewrites() {
    return publicRuntimeConfig.intlRoutes.map((route) => _.omit(route, 'locale'))
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
