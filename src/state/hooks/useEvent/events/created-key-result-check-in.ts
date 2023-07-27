import { User } from 'src/components/User/types'

import { BaseEventData } from './base-event'

export interface CreatedKeyResultCheckInData extends BaseEventData {
  createdByNotification: boolean
  userId: User['id']
  confidence: string
}
