import { BaseEventData } from './base-event'

export interface UpdatedKeyResultCheckMarkTitleEventData extends BaseEventData {
  keyResultID?: string
  checkMarkID?: string
  newTitleLength: number
}
