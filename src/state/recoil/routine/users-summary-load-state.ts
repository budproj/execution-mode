import { atom } from 'recoil'

import { PREFIX } from './constants'

export const answerSummaryLoadStateAtom = atom<boolean>({
  key: `${PREFIX}::ANSWER_SUMMARY_LOAD_STATE`,
  default: false,
})
