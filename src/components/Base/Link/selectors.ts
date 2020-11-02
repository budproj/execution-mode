import flow from 'lodash/flow'

import { Locale, Route } from 'config'

type LocalizedRoute = Record<Locale | string, string>

type LocalizedRouteGroup = Record<string, LocalizedRoute>

type SelectLocalizedHrefOptions = {
  locale: Locale | string
  intlRoutes: Route[]
}

type SelectLocalizedHrefState = {
  href: string
  options: SelectLocalizedHrefOptions
  routes?: LocalizedRouteGroup
  selectedRoute?: LocalizedRoute
}

const groupByRoute = (state: SelectLocalizedHrefState): SelectLocalizedHrefState => ({
  ...state,
  routes: state.options.intlRoutes.reduce(
    (routes, route) => ({
      ...routes,
      [route.destination]: {
        ...routes[route.destination],
        [route.locale]: route.source,
      },
    }),
    {} as LocalizedRouteGroup,
  ),
})

const selectRoute = (state: SelectLocalizedHrefState): SelectLocalizedHrefState => ({
  ...state,
  selectedRoute: state?.routes?.[state.href],
})

const selectLocale = (state: SelectLocalizedHrefState): string =>
  state?.selectedRoute?.[state.options.locale] || state.href

export const selectLocalizedHref: (
  href: string,
  options: SelectLocalizedHrefOptions,
) => string = flow(
  (href, options): SelectLocalizedHrefState => ({ href, options }),
  groupByRoute,
  selectRoute,
  selectLocale,
)
