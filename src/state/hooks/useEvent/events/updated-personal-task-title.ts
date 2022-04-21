import { BaseEventData } from './base-event'

export interface UpdatedPersonalTaskTitleEventData extends BaseEventData {
  taskId?: string
  newTitleLength: number
}
