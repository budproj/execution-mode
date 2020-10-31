// eslint-disable-next-line @typescript-eslint/no-var-requires
const intlRouteGroups = require('./src/intlRouteGroups.json')

const serverRuntimeConfig = {}

const publicRuntimeConfig = {
  environment: process.env.NODE_ENV,
  defaultLocale: process.env.DEFAULT_LOCALE,
}

const i18n = {
  locales:
    publicRuntimeConfig.environment === 'production'
      ? ['pt-BR', 'en-US']
      : [process.env.LOCALE_OVERRIDE || publicRuntimeConfig.defaultLocale],
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
