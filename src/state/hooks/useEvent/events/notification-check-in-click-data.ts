import { User } from 'src/components/User/types'

import { BaseEventData } from './base-event'

export interface NotificationCheckInClickData extends BaseEventData {
  userId: User['id']
}
