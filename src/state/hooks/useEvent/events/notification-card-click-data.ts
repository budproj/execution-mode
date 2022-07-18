import { Notification } from 'src/components/Notifications/NotificationsList/types'

import { BaseEventData } from './base-event'

export interface NotificationCardClickData extends BaseEventData {
  notificationType: Notification['type']
}
