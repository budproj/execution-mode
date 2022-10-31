import { atom } from 'recoil'

import { Comment } from 'src/components/Routine/RetrospectiveTab/Comments/types'

import { PREFIX } from './constants'

export const commentsAtom = atom<Comment[]>({
  key: `${PREFIX}::BY_ENTITY`,
  default: [],
})
