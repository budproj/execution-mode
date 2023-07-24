import { atom } from 'recoil'

import { PREFIX } from './constants'

export const isAchievedKeyResultModalOpenAtom = atom<boolean>({
  key: `${PREFIX}::IS_ACHIEVED_KEY_RESULT_MODAL_OPEN`,
  default: false,
})
