import { BaseEventData } from './base-event'

export interface DeletedKeyResultCheckMarkEventData extends BaseEventData {
  keyResultID: string
  checkMarkID: string
}
