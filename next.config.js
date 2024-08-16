// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const _ = require('lodash')
const { ProvidePlugin } = require('webpack')

const {
  URL,
  HOST,
  APP_VERSION,
  APP_ENV,
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  LOCALE_OVERRIDE,
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
  MAINTENANCE_MODE_ENABLED,
  MAINTENANCE_MODE_EXPECTED_RETURN,
  SMARTLOOK_API_KEY,
  AMPLITUDE_API_KEY,
  SENTRY_DSN,
  SENTRY_AUTH_TOKEN,
  NOTIFICATION_API,
  ROUTINES_API,
  COMMENTS_API,
  LLM_API,
  TASK_MANAGEMENT_API,
  REST_API_BASE,
  FLAGSMITH_CLIENT_KEY,
  NEXT_PUBLIC_MICROSOFT_CLARITY
} = process.env

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: HOST === 'localhost',
  skipWaiting: true,
  sw: 'sw.js',
})

const { withSentryConfig } = require('@sentry/nextjs')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const publicRuntimeConfig = {
  environment: APP_ENV,
  nodeEnv: NODE_ENV,
  defaultLocale: LOCALE_OVERRIDE ?? DEFAULT_LOCALE,
  logLevel: LOG_LEVEL,
  maintenanceMode: {
    enabled: MAINTENANCE_MODE_ENABLED === 'true',
    expectedReturn: new Date(MAINTENANCE_MODE_EXPECTED_RETURN),
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
    llm: LLM_API,
    taskManagement: TASK_MANAGEMENT_API,
  },

  sentry: {
    dsn: SENTRY_DSN,
  },

  flagsmith: {
    clientSideKey: FLAGSMITH_CLIENT_KEY,
  },

  microsoft: {
    clarirt: NEXT_PUBLIC_MICROSOFT_CLARITY
  },

  intlRedirects: [
    {
      source: '/my-key-results',
      destination: '/my-things',
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

module.exports = withBundleAnalyzer(
  withSentryConfig(withPWA(moduleExports, sentryWebpackPluginOptions)),
)
