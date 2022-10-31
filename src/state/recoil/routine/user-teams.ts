import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'

import { PREFIX } from './constants'

export const routineAnswersReturnedData = atom<Team[]>({
  key: `${PREFIX}::ROUTINE_ANSWERS_RETURNED_DATA`,
  default: [],
})
