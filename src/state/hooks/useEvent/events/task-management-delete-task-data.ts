import { TASK_STATUS } from 'src/services/task-management/task-management.service'

import { BaseEventData } from './base-event'

export interface TaskManagerDeleteTaskClickData extends BaseEventData {
  taskStatus: TASK_STATUS
}
