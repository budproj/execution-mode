import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ROUTINES_ANSWER_SUMMARY_LOADING`

export const isAnswerSummaryLoad = atom<boolean>({
  key: KEY,
  default: false,
})
