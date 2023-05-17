import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::KEY_RESULT_ID`

export const isEditingKeyResultIDAtom = atom<string | undefined>({
  key: KEY,
  default: undefined,
})
