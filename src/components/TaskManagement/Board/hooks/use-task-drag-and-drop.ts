import { useRef } from 'react'
import { useDrag, useDrop, XYCoord } from 'react-dnd'

import { Task as TaskModel } from 'src/services/task-management/task-management.service'

import { ItemType } from '../utils/enums'
import { DragItem } from '../utils/models'

const useTaskDragAndDrop = <T extends HTMLElement>(
  { task, index }: { task: TaskModel; index: number },
  handleDropHover: (index_: number, index__: number) => void,
) => {
  const reference = useRef<T>(null)

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    item: { from: task.status, id: task.id, index },
    type: ItemType.TASK,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [_, drop] = useDrop<DragItem, void>({
    accept: ItemType.TASK,
    hover: (item, monitor) => {
      if (!reference.current) {
        return
      }

      // The tasks are not on the same column
      if (item.from !== task.status) {
        return
      }

      const draggedItemIndex = item.index
      const hoveredItemIndex = index

      // We are swapping the task with itself
      if (draggedItemIndex === hoveredItemIndex) {
        return
      }

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered

      // Get mouse coordinatees
      const { x: _, y: mouseY } = monitor.getClientOffset() as XYCoord

      // Get hover item rectangle
      const hoveredBoundingRect = reference.current.getBoundingClientRect()

      // Get hover item middle height position
      const hoveredMiddleHeight = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top
      const isMouseYAboveHoveredMiddleHeight = mouseYRelativeToHovered < hoveredMiddleHeight
      const isMouseYBelowHoveredMiddleHeight = mouseYRelativeToHovered > hoveredMiddleHeight

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return
      }

      // Time to actually perform the action
      handleDropHover(draggedItemIndex, hoveredItemIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoveredItemIndex
    },
  })

  drag(drop(reference))

  return {
    ref: reference,
    isDragging,
  }
}

export default useTaskDragAndDrop
