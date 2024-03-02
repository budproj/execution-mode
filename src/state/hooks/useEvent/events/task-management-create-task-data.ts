import { Except } from 'src/helpers/except'
import { Task } from 'src/services/task-management/task-management.service'

import { BaseEventData } from './base-event'

export interface TaskManagerCreateTaskClickData extends BaseEventData {
  taskData: Except<Task, '_id' | 'createdAt' | 'updatedAt'>
}
