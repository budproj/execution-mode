import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectRouteBasedOnLocale } from './selectors'

const KEY = `${PREFIX}::ROUTE_ATOM`

type IntlRouteParameter = string

const routeAtom = atomFamily<string, IntlRouteParameter>({
  key: KEY,
  default: selectRouteBasedOnLocale,
})

export default routeAtom
