import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_ATOM`

interface RetrospectiveAnswer {
  questionId: string
  value: string
}

export const retrospectiveRoutineListAtom = atom<RetrospectiveAnswer[]>({
  key: KEY,
  default: [],
})
