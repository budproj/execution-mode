const serverRuntimeConfig = {}

const publicRuntimeConfig = {
  environment: process.env.NODE_ENV,
  domain: `${process.env.NODE_ENV}.getbud.co`.replace('production.', ''),
  port: process.env.NODE_ENV === 'production' ? 80 : 3000,
}

const i18n = {
  locales: ['pt-BR', 'en-US'],
  defaultLocale: 'pt-BR',

  domains: [
    {
      domain: `${publicRuntimeConfig.domain}:${publicRuntimeConfig.port}`,
      defaultLocale: 'pt-BR',
    },
    {
      domain: `en.${publicRuntimeConfig.domain}:${publicRuntimeConfig.port}`,
      defaultLocale: 'en-US',
    },
  ],
}

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,
}
