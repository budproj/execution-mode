import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OPENED_ROUTINE_DRAWER`

export const routineDrawerOpened = atom<boolean>({
  key: KEY,
  default: false,
})
