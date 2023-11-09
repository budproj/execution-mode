import { useDrop } from 'react-dnd'

import {
  TASK_STATUS as ColumnType,
  Task as TaskModel,
} from 'src/services/task-management/task-management.service'

import { ItemType } from '../utils/enums'
import { DragItem } from '../utils/models'

const useColumnDrop = (
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['id']) => void,
) => {
  const [{ isOver }, dropReference] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return
      }

      handleDrop(dragItem.from, dragItem.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return {
    isOver,
    dropReference,
  }
}

export default useColumnDrop
