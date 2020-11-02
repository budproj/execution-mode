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

const buildLocalizedHref = (state: SelectLocalizedHrefState): string =>
  state?.selectedRoute?.[state.options.locale] || state.href

export const selectLocalizedHref: (
  href: string,
  options: SelectLocalizedHrefOptions,
) => string = flow(
  (href, options): SelectLocalizedHrefState => ({ href, options }),
  groupByRoute,
  selectRoute,
  buildLocalizedHref,
)

type SelectAbsoluteHrefState = {
  href: string
  currentRoute: string
  parentPathParts?: string[]
  absoluteHrefParts?: string[]
}

const isAbsolutePath = (path: string): boolean => path.startsWith('/')

const extractParentPath = (state: SelectAbsoluteHrefState): SelectAbsoluteHrefState => ({
  ...state,
  parentPathParts: state.currentRoute.split('/').slice(0, -1),
})

const appendDesiredRoute = (state: SelectAbsoluteHrefState): SelectAbsoluteHrefState => ({
  ...state,
  absoluteHrefParts: [...(state.parentPathParts || []), state.href],
})

const buildAbsoluteHref = (state: SelectAbsoluteHrefState): string =>
  (state.absoluteHrefParts || []).join('/')

const transformRelativeHrefToAbsolute: (href: string, currentRoute: string) => string = flow(
  (href: string, currentRoute: string): SelectAbsoluteHrefState => ({ href, currentRoute }),
  extractParentPath,
  appendDesiredRoute,
  buildAbsoluteHref,
)

export const selectAbsoluteHref = (href: string, currentRoute: string): string =>
  isAbsolutePath(href) ? href : transformRelativeHrefToAbsolute(href, currentRoute)
