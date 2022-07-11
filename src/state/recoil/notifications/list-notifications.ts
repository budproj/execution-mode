import { atom } from 'recoil'

import { Notification } from 'src/components/Notifications/NotificationsList/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::NOTIFICATIONS_ATOM_FAMILY`

export type NotificationsList = {
  notifications: Notification[]
}

export const listNotificationsAtom = atom<NotificationsList>({
  key: KEY,
  default: {
    notifications: [],
  },
})

export default listNotificationsAtom
