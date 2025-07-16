import { atom } from 'recoil'

import { AnswerSummary } from 'src/components/Routine/RetrospectiveTab/types'

import { PREFIX } from './constants'

export const answerSummaryAtom = atom<AnswerSummary[]>({
  key: `${PREFIX}::ANSWER_SUMMARY`,
  default: [],
})
