// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const _ = require('lodash')
const { ProvidePlugin } = require('webpack')
const { withSentryConfig, configureScope } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

const {
  URL,
  HOST,
  APP_VERSION,
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
  AUTH0_API_DOMAIN,
  HOTJAR_ID,
  HOTJAR_SV,
  MIRAGE_ENABLED,
  MIRAGE_FAKER_SEED,
  MAINTENANCE_MODE_ENABLED,
  MAINTENANCE_MODE_EXPECTED_RETURN,
  SMARTLOOK_API_KEY,
  AMPLITUDE_API_KEY,
  SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  NOTIFICATION_API,
  ROUTINES_API,
  COMMENTS_API,
  REST_API_BASE,
  FLAGSMITH_CLIENT_KEY,
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
    apiDomain: AUTH0_API_DOMAIN,
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
    notifications: NOTIFICATION_API,
    restBase: REST_API_BASE,
    routines: ROUTINES_API,
    comments: COMMENTS_API,
  },

  sentry: {
    dsn: SENTRY_DSN,
  },

  flagsmith: {
    clientSideKey: FLAGSMITH_CLIENT_KEY,
  },

  intlRedirects: [
    {
      source: '/meus-resultados-chave',
      destination: '/minhas-coisas',
    },
    {
      source: '/pt-BR/meus-resultados-chave',
      destination: '/pt-BR/minhas-coisas',
    },
    {
      source: '/my-key-results',
      destination: '/my-things',
    },
  ],

  intlRoutes: [
    {
      source: '/pt-BR/minhas-coisas',
      destination: '/my-things',
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
      source: '/pt-BR/configuracoes',
      destination: '/settings',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/novo-ambiente',
      destination: '/new-workspace',
      locale: 'pt-BR',
    },

    {
      source: '/pt-BR/perfil',
      destination: '/profile',
      locale: 'pt-BR',
    },
  ],
}

const serverRuntimeConfig = {
  url: URL,
  host: HOST,
  supportedLocales: LOCALE_OVERRIDE ? [LOCALE_OVERRIDE] : SUPPORTED_LOCALES.split(','),
  sentry: {
    dsn: SENTRY_DSN,
  },
}

const i18n = {
  locales: serverRuntimeConfig.supportedLocales,
  defaultLocale: publicRuntimeConfig.defaultLocale,
}

const moduleExports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,
  output: 'standalone',

  async rewrites() {
    return publicRuntimeConfig.intlRoutes.map((route) => ({
      ...route,
      locale: false,
    }))
  },

  async redirects() {
    return publicRuntimeConfig.intlRedirects.map((route) => ({
      ...route,
      locale: false,
      permanent: true,
    }))
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      Object.assign(config.resolve, {
        fallback: {
          fs: false,
          buffer: require.resolve('buffer'),
        },
      })
    }

    const libDir = path.join(__dirname, '../lib')
    config.module.rules[0].include = [libDir]
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    config.plugins = [
      ...config.plugins,
      new ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new ProvidePlugin({
        process: 'process/browser',
      }),
    ]

    config.optimization.usedExports = true

    return config
  },

  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },
}

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  authToken: SENTRY_AUTH_TOKEN,
  org: 'bud-xs',
  project: 'execution-mode',
  ignore: ['node_modules'],
  release: APP_VERSION || 'development',

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withBundleAnalyzer(withSentryConfig(moduleExports, sentryWebpackPluginOptions))
