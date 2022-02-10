import { BaseEventData } from './base-event'

export interface ToggledKeyResultCheckMarkEventData extends BaseEventData {
  keyResultID?: string
  checkMarkID?: string
  previousState: 'checked' | 'unchecked'
  newState: 'checked' | 'unchecked'
}
