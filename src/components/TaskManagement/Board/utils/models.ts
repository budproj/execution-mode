import { TASK_STATUS as ColumnType } from 'src/services/new-task-management/@types/task-status.enum'
import { Task } from 'src/services/new-task-management/@types/task.type'

export interface DragItem {
  index: number
  id: Task['id']
  from: ColumnType
}
