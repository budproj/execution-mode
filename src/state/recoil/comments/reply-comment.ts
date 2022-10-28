import { atom } from 'recoil'

import { PREFIX } from './constants'

export const commentEntityToReply = atom<string | undefined>({
  key: `${PREFIX}::REPLY`,
  default: undefined,
})
