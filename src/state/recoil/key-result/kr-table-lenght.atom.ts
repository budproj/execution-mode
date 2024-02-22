import { atom } from 'recoil'

import { PREFIX } from './constants'

export const krTableLengthAtom = atom<number>({
  key: `${PREFIX}::KR_TABLE_LENGHT`,
  default: 0,
})
