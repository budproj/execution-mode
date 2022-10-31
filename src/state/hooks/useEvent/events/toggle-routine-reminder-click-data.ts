import { BaseEventData } from './base-event'

export interface ToggleRoutineReminderClickData extends BaseEventData {
  timestamp: Date
  isActive: boolean
}
