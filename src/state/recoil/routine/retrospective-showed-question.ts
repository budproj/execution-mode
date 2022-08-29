import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_INDEX_QUESTION_ATOM`

interface retrospectiveRoutineCurrentQuestionProperties {
  stepsFromPreviousQuestion?: number
  currentQuestionIndex: number
}

export const retrospectiveRoutineIndexQuestionAtom =
  atom<retrospectiveRoutineCurrentQuestionProperties>({
    key: KEY,
    default: {
      stepsFromPreviousQuestion: undefined,
      currentQuestionIndex: 0,
    },
  })
