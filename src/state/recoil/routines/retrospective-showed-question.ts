import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_INDEX_QUESTION_ATOM`

export const retrospectiveRoutineIndexQuestionAtom = atom<number>({
  key: KEY,
  default: 1,
})
