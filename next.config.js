// eslint-disable-next-line @typescript-eslint/no-var-requires
const omit = require('lodash/omit')

const { HOST, APP_ENV, DEFAULT_LOCALE, LOCALE_OVERRIDE, SUPPORTED_LOCALES } = process.env

const publicRuntimeConfig = {
  environment: APP_ENV,
  defaultLocale: DEFAULT_LOCALE,

  intlRoutes: [
    {
      destination: '/keyResults',
      source: '/resultados-chave',
      locale: 'pt-BR',
    },
    {
      destination: '/keyResults',
      source: '/key-results',
      locale: 'en-US',
    },
  ],
}

const serverRuntimeConfig = {
  host: HOST,
  supportedLocales:
    publicRuntimeConfig.environment === 'production'
      ? SUPPORTED_LOCALES.split(',')
      : [LOCALE_OVERRIDE || publicRuntimeConfig.defaultLocale],
}

const i18n = {
  locales: serverRuntimeConfig.supportedLocales,
  defaultLocale: publicRuntimeConfig.defaultLocale,

  domains: [
    {
      domain: 'getbud.co',
      defaultLocale: 'pt-BR',
    },
    {
      domain: 'en.getbud.co',
      defaultLocale: 'en-US',
    },
  ],
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,

  async rewrites() {
    return publicRuntimeConfig.intlRoutes.map((route) => omit(route, ['locale']))
  },
}
