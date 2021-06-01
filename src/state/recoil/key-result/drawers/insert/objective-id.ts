import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OBJECTIVE_ID`

export const keyResultInsertDrawerObjectiveID = atom<string | undefined>({
  key: KEY,
  default: undefined,
})
