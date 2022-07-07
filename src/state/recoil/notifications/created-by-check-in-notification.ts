import { atom } from 'recoil'

import { PREFIX } from './constants'

export const createdByCheckInNotificationAtom = atom<boolean>({
  key: `${PREFIX}::CREATED_BY_CHECK_IN_NOTIFICATION`,
  default: false,
})
