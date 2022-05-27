import { User } from 'src/components/User/types'

import { BaseEventData } from './base-event'

export interface CreatedKeyResultData extends BaseEventData {
  isPersonal: boolean
  userId: User['id']
}
