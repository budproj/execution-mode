import { TASK_STATUS } from 'src/services/task-management/@types/task-status.enum'

import { BaseEventData } from './base-event'

export interface TaskManagerDeleteTaskClickData extends BaseEventData {
  taskStatus: TASK_STATUS
}
