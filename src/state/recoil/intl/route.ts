import flow from 'lodash/flow'
import { atomFamily, selectorFamily } from 'recoil'

import { PREFIX } from './constants'
import { locale as localeAtom } from './locale'

import getConfig, { Locale, Route } from 'config'

const KEY = `${PREFIX}::ROUTE`

type SelectIntlRouteBasedOnRouteParam = string

type IntlRouteParam = string

type IntlRoute = Record<Locale | string, string>

type IntlRouteGroup = Record<string, IntlRoute>

type SelectAbsoluteRouteState = {
  route: string
  currentRoute: string
  parentRouteParts?: string[]
  absoluteRouteParts?: string[]
}

type SelectIntlRouteOptions = {
  locale: Locale | string
  intlRoutes: Route[]
}

type SelectIntlRouteState = {
  route: string
  options: SelectIntlRouteOptions
  routes?: IntlRouteGroup
  selectedRoute?: IntlRoute
}

const buildIntlRouteBasedOnLocale = (route: string, locale: string): string => {
  const { publicRuntimeConfig } = getConfig()
  const { intlRoutes } = publicRuntimeConfig

  const currentRoute = selectCurrentRoute()
  const absoluteRoute = selectAbsoluteRoute(route, currentRoute)
  const intlRoute = selectIntlRoute(absoluteRoute, { locale, intlRoutes })

  return intlRoute
}

const selectCurrentRoute = (): string => window.location.pathname

export const selectAbsoluteRoute = (route: string, currentRoute: string): string =>
  isAbsoluteRoute(route) ? route : transformRelativeRouteToAbsolute(route, currentRoute)

const isAbsoluteRoute = (route: string): boolean => route.startsWith('/')

const extractParentRoute = (state: SelectAbsoluteRouteState): SelectAbsoluteRouteState => ({
  ...state,
  parentRouteParts: state.currentRoute.split('/').slice(0, -1),
})

const appendDesiredRoute = (state: SelectAbsoluteRouteState): SelectAbsoluteRouteState => ({
  ...state,
  absoluteRouteParts: [...(state.parentRouteParts || []), state.route],
})

const buildAbsoluteRoute = (state: SelectAbsoluteRouteState): string =>
  (state.absoluteRouteParts || []).join('/')

const transformRelativeRouteToAbsolute: (route: string, currentRoute: string) => string = flow(
  (route: string, currentRoute: string): SelectAbsoluteRouteState => ({ route, currentRoute }),
  extractParentRoute,
  appendDesiredRoute,
  buildAbsoluteRoute,
)

const groupByRoute = (state: SelectIntlRouteState): SelectIntlRouteState => ({
  ...state,
  routes: state.options.intlRoutes.reduce(
    (routes, route) => ({
      ...routes,
      [route.destination]: {
        ...routes[route.destination],
        [route.locale]: route.source,
      },
    }),
    {} as IntlRouteGroup,
  ),
})

const selectRoute = (state: SelectIntlRouteState): SelectIntlRouteState => ({
  ...state,
  selectedRoute: state?.routes?.[state.route],
})

const buildIntlRoute = (state: SelectIntlRouteState): string =>
  state?.selectedRoute?.[state.options.locale] || state.route

export const selectIntlRoute: (href: string, options: SelectIntlRouteOptions) => string = flow(
  (route, options): SelectIntlRouteState => ({ route, options }),
  groupByRoute,
  selectRoute,
  buildIntlRoute,
)

export const selectIntlRouteBasedOnLocale = selectorFamily<
  string,
  SelectIntlRouteBasedOnRouteParam
>({
  key: `${KEY}::BASED_ON_LOCALE`,
  get: (route) => ({ get }): string => {
    const locale = get(localeAtom)

    return locale ? buildIntlRouteBasedOnLocale(route, locale) : route
  },
})

export const intlRoute = atomFamily<string, IntlRouteParam>({
  key: KEY,
  default: selectIntlRouteBasedOnLocale,
})
