import { atom } from 'recoil'

import { RoutineCommentsInputInitialValues } from 'src/components/Routine/RetrospectiveTab/Comments/CommentInput/wrapper'

import { PREFIX } from './constants'

export const commentInputInitialValue = atom<RoutineCommentsInputInitialValues>({
  key: `${PREFIX}::INPUT`,
  default: { text: '' },
})
