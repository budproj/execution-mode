import { selectorFamily } from 'recoil'

import getConfig, { LOCALE, Route } from 'src/config'

import { RecoilInterfaceGetter } from '../types'

import { PREFIX } from './constants'
import currentNextRouteAtom from './current-next-route'
import localeAtom from './locale'

const KEY = `${PREFIX}::SELECTORS`

type SelectIntlRouteBasedOnRouteParameter = string

type IntlRoute = Record<LOCALE | string, string>

type IntlRouteGroup = Record<LOCALE, IntlRoute['source']>

type IntlRouteTree = Record<string, IntlRouteGroup>

export const getRouteBasedOnLocale =
  (route: string) =>
  ({ get }: RecoilInterfaceGetter): string => {
    const locale = get(localeAtom)
    if (!locale) return route

    const { publicRuntimeConfig } = getConfig()

    const currentRoute = get(currentNextRouteAtom)
    if (!currentRoute) return route

    const absoluteRoute = selectAbsoluteRoute(route, currentRoute)
    const intlRoute = buildIntlRoute(locale, absoluteRoute, route, publicRuntimeConfig.intlRoutes)
    const staticIntlRoute = parseDynamicRoute(intlRoute, route)

    return staticIntlRoute
  }

export const selectRouteBasedOnLocale = selectorFamily<
  string,
  SelectIntlRouteBasedOnRouteParameter
>({
  key: `${KEY}::ROUTE::BASED_ON_LOCALE`,
  get: getRouteBasedOnLocale,
})

export const selectAbsoluteRoute = (route: string, currentRoute: string): string =>
  isAbsoluteRoute(route) ? route : transformRelativeRouteToAbsolute(route, currentRoute)

const isAbsoluteRoute = (route: string): boolean => route.startsWith('/')

const transformRelativeRouteToAbsolute = (route: string, currentRoute: string): string => {
  const parentRouteParts = currentRoute.split('/')
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

const makeDynamicRoutesStatic = (
  intlRouteTree: IntlRouteTree,
  relativeRoute: string,
): IntlRouteTree => {
  const intlRouteTreeEntries = Object.entries(intlRouteTree)
  const staticRouteTreeEntries = intlRouteTreeEntries.map(([key, value]) => [
    parseDynamicRoute(key, relativeRoute),
    value,
  ])
  const staticRouteTree = Object.fromEntries(staticRouteTreeEntries)

  return staticRouteTree
}

const parseDynamicRoute = (route: string, staticValue: string) => {
  const routeParts = route.split('/').slice(1)
  const staticValueParts = staticValue.split('/')

  const dynamicValue = staticValueParts.pop() ?? ''
  const parameter = routeParts.pop()
  const isDynamic = parameter?.[0] === ':'

  const newRouteParts = [undefined, ...routeParts, isDynamic ? dynamicValue : parameter]
  const staticRoute = newRouteParts.join('/')

  return staticRoute
}

const selectRouteGroup = (
  absoluteRoute: string,
  intlRouteTree: IntlRouteTree,
): IntlRouteGroup | undefined => intlRouteTree[absoluteRoute]

const selectIntlRoute = (locale: LOCALE | string, intlRouteGroup: IntlRouteGroup): string =>
  intlRouteGroup[locale as LOCALE]

const buildIntlRoute = (
  locale: LOCALE | string,
  absoluteRoute: string,
  relativeRoute: string,
  intlRoutes: Route[],
): string => {
  const intlRouteTree = groupByDestination(intlRoutes)
  const intlStaticRouteTree = makeDynamicRoutesStatic(intlRouteTree, relativeRoute)
  const intlRouteGroup = selectRouteGroup(absoluteRoute, intlStaticRouteTree)
  if (!intlRouteGroup) return absoluteRoute

  const intlRoute = selectIntlRoute(locale, intlRouteGroup)
  if (!intlRoute) return absoluteRoute

  return intlRoute
}
