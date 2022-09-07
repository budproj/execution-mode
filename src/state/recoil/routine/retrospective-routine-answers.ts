import { atom } from 'recoil'

import { FormAnswerFormats } from 'src/components/Routine/Drawer/Questions/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_ATOM`

interface RetrospectiveAnswer {
  questionId: string
  questionAnswer: FormAnswerFormats
}

export const retrospectiveRoutineListAtom = atom<RetrospectiveAnswer[]>({
  key: KEY,
  default: [],
})
