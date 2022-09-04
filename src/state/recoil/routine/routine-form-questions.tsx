import { atom } from 'recoil'

import { FormQuestion } from 'src/components/Routine/Drawer/Questions/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ROUTINE_FORM_QUESTIONS_ATOM`

interface RoutineFormQuestionsProperties {
  questions: FormQuestion[]
}

export const routineFormQuestions = atom<RoutineFormQuestionsProperties>({
  key: KEY,
  default: {
    questions: [],
  },
})
