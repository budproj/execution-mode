import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_ATOM`

export interface RetrospectiveAnswer {
  questionId: string
  value: string
  hidden?: boolean
}

export const retrospectiveRoutineListAtom = atom<RetrospectiveAnswer[]>({
  key: KEY,
  default: [],
})
