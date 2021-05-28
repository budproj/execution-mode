import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_OPEN`

export const keyResultInsertDrawerIsOpen = atom<boolean>({
  key: KEY,
  default: false,
})
