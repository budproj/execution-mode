import { atom, selector } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::RETROSPECTIVE_ROUTINE_ATOM`

interface RetrospectiveAnswer {
  answerIndex: number
  answer: string
}

export const retrospectiveRoutineListAtom = atom<RetrospectiveAnswer[]>({
  key: KEY,
  default: [],
})

export const retrospectiveRoutineSelector = selector({
  key: `${PREFIX}::RETROSPECTIVE_ROUTINE_SELECTOR`,
  get: ({ get }) => {
    const list = get(retrospectiveRoutineListAtom)

    return list
  },
})
