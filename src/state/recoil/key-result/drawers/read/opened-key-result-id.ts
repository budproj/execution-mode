import { atom } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OPENED_KEY_RESULT_ID`

export const keyResultReadDrawerOpenedKeyResultID = atom<KeyResult['id'] | undefined>({
  key: KEY,
  default: undefined,
})
