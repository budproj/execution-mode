const serverRuntimeConfig = {}

const publicRuntimeConfig = {
  environment: process.env.NODE_ENV,
}

const i18n = {
  locales:
    publicRuntimeConfig.environment === 'production'
      ? ['pt-BR', 'en-US']
      : [process.env.LOCALE_OVERRIDE || 'pt-BR'],
  defaultLocale: 'pt-BR',

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
}
