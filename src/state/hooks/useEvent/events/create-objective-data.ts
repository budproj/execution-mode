import { User } from 'src/components/User/types'

import { BaseEventData } from './base-event'

export interface CreatedObjectiveData extends BaseEventData {
  isPersonal: boolean
  userId: User['id']
}
