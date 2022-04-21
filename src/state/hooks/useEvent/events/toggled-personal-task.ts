import { BaseEventData } from './base-event'

export interface ToggledPersonalTaskEventData extends BaseEventData {
  taskId?: string
  previousState: 'checked' | 'unchecked'
  newState: 'checked' | 'unchecked'
}
