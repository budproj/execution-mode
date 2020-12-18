import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURRENT_NEXT_ROUTE`

const currentNextRoute = atom<string>({
  key: KEY,
  default: '',
})

export default currentNextRoute
