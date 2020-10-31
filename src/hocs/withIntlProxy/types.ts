import { Locale } from 'config'

export type IntlRouteGroup = Record<Locale, string>

export type IntlRouteGroupsFile = Record<string, IntlRouteGroup>
