import { Except } from 'src/helpers/except'
import { Task } from 'src/services/task-management/@types/task.type'

import { BaseEventData } from './base-event'

export interface TaskManagerCreateTaskClickData extends BaseEventData {
  taskData: Except<Task, 'id' | 'createdAt' | 'updatedAt'>
}
