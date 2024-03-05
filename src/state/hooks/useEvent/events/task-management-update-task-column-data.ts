import { TASK_STATUS } from 'src/services/task-management/task-management.service'

import { BaseEventData } from './base-event'

export interface TaskManagerUpdateTaskColumnData extends BaseEventData {
  src: TASK_STATUS
  dst: TASK_STATUS
}
