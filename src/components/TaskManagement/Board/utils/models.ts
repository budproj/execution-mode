import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'

export interface DragItem {
  index: number
  id: Task['id']
  from: ColumnType
}
