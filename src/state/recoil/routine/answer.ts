import { atom } from 'recoil'

import { AnswerDetails } from 'src/components/Routine/RetrospectiveTab/Answers/types'

import { PREFIX } from './constants'

const defaultAnswer: AnswerDetails = { userId: '', history: [], answers: [] }

export const answerDetailedAtom = atom<AnswerDetails>({
  key: `${PREFIX}::ANSWER_DETAILED`,
  default: defaultAnswer,
})
