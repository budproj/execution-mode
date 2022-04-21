import { BaseEventData } from './base-event'

export interface DeletedPersonalTaskEventData extends BaseEventData {
  taskId?: string
}
