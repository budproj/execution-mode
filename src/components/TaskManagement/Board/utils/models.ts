import {
  Task,
  TASK_STATUS as ColumnType,
} from 'src/services/task-management/task-management.service'

export interface DragItem {
  index: number
  _id: Task['_id']
  from: ColumnType
}
