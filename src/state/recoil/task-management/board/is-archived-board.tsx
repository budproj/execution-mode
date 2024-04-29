import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::IS_ARCHIVED_BOARD`

export const isArchivedBoardAtom = atom<boolean>({
  key: KEY,
  default: false,
})
