import { atom } from 'recoil'

import { AnswerDetails } from 'src/components/Routine/RetrospectiveTab/Answers/types'
import { answerDetailsMocked } from 'src/components/Routine/RetrospectiveTab/Answers/utils/answer-datails.mocked'

import { PREFIX } from './constants'

export const answerDetailedAtom = atom<AnswerDetails>({
  key: `${PREFIX}::ANSWER_DETAILED`,
  default: answerDetailsMocked,
})
