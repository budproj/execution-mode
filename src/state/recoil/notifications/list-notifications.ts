import { atom } from 'recoil'

import { NotificationsMockedArray } from 'src/components/Notifications/NotificationsList/Utils/mocked'
import { Notification } from 'src/components/Notifications/NotificationsList/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::NOTIFICATIONS_ATOM_FAMILY`

export const listNotificationsAtom = atom<Notification[]>({
  key: KEY,
  default: NotificationsMockedArray,
})

export default listNotificationsAtom
