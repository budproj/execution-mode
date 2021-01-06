import { atomFamily } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::COMMENT_ENABLED`

export const commentEnabled = atomFamily({
  key: KEY,
  default: false,
})

export default commentEnabled
