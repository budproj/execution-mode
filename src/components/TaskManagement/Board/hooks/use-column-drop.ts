import { useDrop } from 'react-dnd'

import { TASK_STATUS as ColumnType } from 'src/services/new-task-management/@types/task-status.enum'
import { Task as TaskModel } from 'src/services/new-task-management/@types/task.type'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { ItemType } from '../utils/enums'
import { DragItem } from '../utils/models'

const useColumnDrop = (column: ColumnType, handleDrop: (taskId: TaskModel['id']) => void) => {
  const { dispatch } = useEvent(EventType.TASK_MANAGER_UPDATE_TASK_COLUMN)
  const [{ isOver }, dropReference] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return
      }

      handleDrop(dragItem.id)
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
