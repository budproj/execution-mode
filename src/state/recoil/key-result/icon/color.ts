import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconColorBasedOnTitle } from './selectors'

const KEY = `${PREFIX}::COLOR`

const color = atomFamily<string, string | undefined>({
  key: KEY,
  default: selectKeyResultIconColorBasedOnTitle,
})

export default color
