import { selectorFamily } from 'recoil'

import getConfig, { Locale, Route } from 'src/config'

import { PREFIX } from './constants'
import localeAtom from './locale-atom'

const KEY = `${PREFIX}::SELECTORS`

type SelectIntlRouteBasedOnRouteParameter = string

type IntlRoute = Record<Locale | string, string>

type IntlRouteGroup = Record<Locale, IntlRoute['source']>

type IntlRouteTree = Record<string, IntlRouteGroup>

const selectCurrentRoute = (): string => window.location.pathname

export const selectAbsoluteRoute = (route: string, currentRoute: string): string =>
  isAbsoluteRoute(route) ? route : transformRelativeRouteToAbsolute(route, currentRoute)

const isAbsoluteRoute = (route: string): boolean => route.startsWith('/')

const transformRelativeRouteToAbsolute = (route: string, currentRoute: string): string => {
  const parentRouteParts = currentRoute.split('/').slice(0, -1)
  const absoluteRouteParts = [...(parentRouteParts ?? []), route]
  const absoluteRoute = (absoluteRouteParts ?? []).join('/')

  return absoluteRoute
}

const groupByDestination = (intlRoutes: Route[]): IntlRouteTree =>
  intlRoutes.reduce<IntlRouteTree>(
    (routeGroup, route) => ({
      ...routeGroup,
      [route.destination]: {
        ...routeGroup[route.destination],
        [route.locale]: route.source,
      },
    }),
    {},
  )

const selectRouteGroup = (
  absoluteRoute: string,
  intlRouteTree: IntlRouteTree,
): IntlRouteGroup | undefined => intlRouteTree[absoluteRoute]

const selectIntlRoute = (locale: Locale | string, intlRouteGroup: IntlRouteGroup): string =>
  intlRouteGroup[locale as Locale]

const buildIntlRoute = (
  locale: Locale | string,
  absoluteRoute: string,
  intlRoutes: Route[],
): string => {
  const intlRouteTree = groupByDestination(intlRoutes)
  const intlRouteGroup = selectRouteGroup(absoluteRoute, intlRouteTree)
  if (!intlRouteGroup) return absoluteRoute

  const intlRoute = selectIntlRoute(locale, intlRouteGroup)

  return intlRoute
}

export const selectRouteBasedOnLocale = selectorFamily<
  string,
  SelectIntlRouteBasedOnRouteParameter
>({
  key: `${KEY}::ROUTE::BASED_ON_LOCALE`,
  get: (route) => ({ get }): string => {
    const locale = get(localeAtom)
    if (!locale) return route

    const { publicRuntimeConfig } = getConfig()

    const currentRoute = selectCurrentRoute()
    const absoluteRoute = selectAbsoluteRoute(route, currentRoute)
    const intlRoute = buildIntlRoute(locale, absoluteRoute, publicRuntimeConfig.intlRoutes)

    return intlRoute
  },
})
