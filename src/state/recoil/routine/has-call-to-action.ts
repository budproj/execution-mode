import { atom } from 'recoil'

import { PREFIX } from './constants'

export const hasCallToActionOnAnswerDetails = atom<boolean>({
  key: `${PREFIX}::HAS_CALL_TO_ACTION`,
  default: false,
})
