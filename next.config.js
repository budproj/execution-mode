// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const _ = require('lodash')

const {
  URL,
  HOST,
  APP_ENV,
  LOCALE_OVERRIDE,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  NODE_ENV,
  LOG_LEVEL,
  API_GRAPHQL,
  AUTH0_CLIENT_ID_PUBLIC,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  AUTH0_AUDIENCE,
  HOTJAR_ID,
  HOTJAR_SV,
  MIRAGE_ENABLED,
  MIRAGE_FAKER_SEED,
  MAINTENANCE_MODE_ENABLED,
  MAINTENANCE_MODE_EXPECTED_RETURN,
  SMARTLOOK_API_KEY,
  AMPLITUDE_API_KEY,
} = process.env

const publicRuntimeConfig = {
  environment: APP_ENV,
  nodeEnv: NODE_ENV,
  defaultLocale: LOCALE_OVERRIDE ?? DEFAULT_LOCALE,
  logLevel: LOG_LEVEL,
  maintenanceMode: {
    enabled: MAINTENANCE_MODE_ENABLED === 'true',
    expectedReturn: new Date(MAINTENANCE_MODE_EXPECTED_RETURN),
  },

  mirage: {
    enabled: MIRAGE_ENABLED === 'true',
    fakerSeed: parseInt(MIRAGE_FAKER_SEED),
  },

  auth0: {
    clientID: AUTH0_CLIENT_ID_PUBLIC,
    domain: AUTH0_DOMAIN,
    scope: AUTH0_SCOPE,
    audience: AUTH0_AUDIENCE,
  },

  hotjar: {
    id: parseInt(HOTJAR_ID),
    sv: parseInt(HOTJAR_SV),
  },

  smartlook: {
    id: SMARTLOOK_API_KEY,
  },

  amplitude: {
    apiKey: AMPLITUDE_API_KEY,
  },

  api: {
    graphql: API_GRAPHQL,
  },

  intlRoutes: [
    {
      source: '/pt-BR/meus-resultados-chave',
      destination: '/my-key-results',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/meus-resultados-chave/ciclos-anteriores',
      destination: '/my-key-results/previous-cycles',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/explorar',
      destination: '/explore',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/explorar/:id',
      destination: '/explore/:id',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/configuracoes/meu-perfil',
      destination: '/settings/my-profile',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/configuracoes/plataforma',
      destination: '/settings/platform',
      locale: 'pt-BR',
    },
  ],
}

const serverRuntimeConfig = {
  url: URL,
  host: HOST,
  supportedLocales: LOCALE_OVERRIDE ? [LOCALE_OVERRIDE] : SUPPORTED_LOCALES.split(','),
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
    return publicRuntimeConfig.intlRoutes.map((route) => ({
      ...route,
      locale: false,
    }))
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }

    const libDir = path.join(__dirname, '../lib')
    config.module.rules[0].include.push(libDir)
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
}
