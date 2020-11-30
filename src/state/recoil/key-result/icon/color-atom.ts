import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconColorBasedOnTitle } from './selectors'

const KEY = `${PREFIX}::COLOR_ATOM`

const colorAtom = atomFamily<string, string | undefined>({
  key: KEY,
  default: selectKeyResultIconColorBasedOnTitle,
})

export default colorAtom
