import { atom } from 'recoil'

import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CURSOR_ANSWER_PAGINATION`

type CursorAnswerPaginationData = {
  lastLoadedUser?: User['id']
  teamId?: Team['id']
}

export const answerSummaryPaginationAtom = atom<CursorAnswerPaginationData>({
  key: KEY,
  default: {},
})
