import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconColorBasedOnTitle } from './selectors'

const KEY = `${PREFIX}::COLOR_ATOM`

type KeyResultIconColorParameter = string

const colorAtom = atomFamily<string, KeyResultIconColorParameter>({
  key: KEY,
  default: selectKeyResultIconColorBasedOnTitle,
})

export default colorAtom
