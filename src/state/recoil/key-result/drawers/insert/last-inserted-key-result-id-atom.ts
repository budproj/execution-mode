import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LAST_INSERTED_KEY_RESULT_ID`

export const lastInsertedKeyResultIDAtom = atom<string | undefined>({
  key: KEY,
  default: undefined,
})
