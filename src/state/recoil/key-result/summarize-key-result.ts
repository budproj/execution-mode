import { atom } from 'recoil'

import { PREFIX } from './constants'

export const keyResultSummarizeAtom = atom<string>({
  key: `${PREFIX}::KR_SUMMARIZE`,
  default: undefined,
})
