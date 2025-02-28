import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/new-task-management/new-task-management.service'

export interface DragItem {
  index: number
  id: Task['id']
  from: ColumnType
}
