import { atom } from 'recoil'

import { PREFIX } from './constants'

export const checkInNotificationCountAtom = atom<number>({
  key: `${PREFIX}::CHECK_IN_NOTIFICATION_COUNT`,
  default: 0,
})
