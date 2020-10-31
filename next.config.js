// eslint-disable-next-line @typescript-eslint/no-var-requires
const intlRouteGroups = require('./src/intlRouteGroups.json')
const { HOST, APP_ENV, DEFAULT_LOCALE, LOCALE_OVERRIDE, SUPPORTED_LOCALES } = process.env

const publicRuntimeConfig = {
  environment: APP_ENV,
  defaultLocale: DEFAULT_LOCALE,
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

const normalizeIntlRouteGroup = (routeGroupEntry) => ({
  destination: routeGroupEntry[0],
  variants: Object.values(routeGroupEntry[1]),
})

const normalizedIntlRouteGrops = Object.entries(intlRouteGroups).map(normalizeIntlRouteGroup)

const buildProxiedRoutes = (...routeGroups) => routeGroups.map(buildSingleProxiedRouteGroup).flat(4)

const buildSingleProxiedRouteGroup = (routeGroup) => routeGroup.map(buildSingleRoute)

const buildSingleRoute = ({ destination, variants }) =>
  variants.map((variant) => buildRouteVariant(variant, destination))

const buildRouteVariant = (variant, destination) => ({
  destination,
  source: variant,
})

module.exports = {
  serverRuntimeConfig,
  publicRuntimeConfig,
  i18n,

  async rewrites() {
    return buildProxiedRoutes(normalizedIntlRouteGrops)
  },
}
