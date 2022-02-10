import { BaseEventData } from './base-event'

export interface UpdatedKeyResultCheckMarkAssigneeEventData extends BaseEventData {
  keyResultID: string
  checkMarkID: string
  previousAssigneeUserID: string
  newAssigneeUserID: string
}
