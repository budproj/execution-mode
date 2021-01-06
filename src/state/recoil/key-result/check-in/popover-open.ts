import { atomFamily } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::POPOVER_OPEN`

export const popoverOpen = atomFamily({
  key: KEY,
  default: false,
})

export default popoverOpen
