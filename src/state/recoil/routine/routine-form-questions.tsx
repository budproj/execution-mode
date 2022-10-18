import { atom, selector } from 'recoil'

import { FormQuestion } from 'src/components/Routine/Drawer/Questions/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ROUTINE_FORM_QUESTIONS_ATOM`

export const routineFormQuestions = atom<FormQuestion[]>({
  key: KEY,
  default: [],
})

export const retrospectiveRoutineSelector = selector({
  key: `${PREFIX}::RETROSPECTIVE_ROUTINE_SELECTOR`,
  get: ({ get }) => {
    const questions = get(routineFormQuestions)
    const filteredQuestions = questions.filter((question) => !question.hidden)

    return filteredQuestions
  },
})
