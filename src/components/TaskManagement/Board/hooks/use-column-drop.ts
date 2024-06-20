import { useDrop } from 'react-dnd'

import {
  TASK_STATUS as ColumnType,
  Task as TaskModel,
} from 'src/services/task-management/task-management.service'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { ItemType } from '../utils/enums'
import { DragItem } from '../utils/models'

const useColumnDrop = (
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, taskId: TaskModel['_id']) => void,
) => {
  const { dispatch } = useEvent(EventType.TASK_MANAGER_UPDATE_TASK_COLUMN)
  const [{ isOver }, dropReference] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return
      }

      handleDrop(dragItem.from, dragItem._id)
      dispatch({ src: dragItem.from, dst: column })
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
