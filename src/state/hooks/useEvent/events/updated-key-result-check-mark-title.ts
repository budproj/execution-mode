import { BaseEventData } from './base-event'

export interface UpdatedKeyResultCheckMarkTitleEventData extends BaseEventData {
  keyResultID: string
  checkmarkID: string
  newTitleLength: number
}
