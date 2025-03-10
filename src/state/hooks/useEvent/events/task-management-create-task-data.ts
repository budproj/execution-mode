import { Except } from 'src/helpers/except'
import { Task } from 'src/services/new-task-management/new-task-management.service'

import { BaseEventData } from './base-event'

export interface TaskManagerCreateTaskClickData extends BaseEventData {
  taskData: Except<Task, 'id' | 'createdAt' | 'updatedAt'>
}
