import { BaseEventData } from './base-event'

export interface ToggledKeyResultCheckMarkEventData extends BaseEventData {
  keyResultID: string
  checkmarkID: string
  previousState: 'checked' | 'unchecked'
  newState: 'checked' | 'unchecked'
}
