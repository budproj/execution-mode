import { atom } from 'recoil'

import { PREFIX } from './constants'

export const notificationCountAtom = atom<number>({
  key: `${PREFIX}::NOTIFICATION_COUNT`,
  default: 0,
})
