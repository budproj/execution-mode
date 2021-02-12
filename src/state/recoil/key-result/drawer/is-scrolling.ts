import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_SCROLLING`

export const isScrolling = atomFamily<boolean, KeyResult['id'] | undefined>({
  key: KEY,
  default: false,
})

export default isScrolling
