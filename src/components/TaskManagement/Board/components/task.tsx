import { Box, HStack, ScaleFade, VStack } from '@chakra-ui/react'
import _ from 'lodash'
import React, { memo } from 'react'
import { useSetRecoilState } from 'recoil'

import { TaskPriority } from 'src/components/Base/KanbanTaskCard/kanban-task-card-root'
import { KanbanTaskCard } from 'src/components/Base/KanbanTaskCard/wrapper'
import { Task as TaskModel } from 'src/services/task-management/task-management.service'
import { taskDrawerAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer'
import { taskDrawerIdAtom } from 'src/state/recoil/task-management/drawers/task-drawer/task-drawer-id'

import useTaskDragAndDrop from '../hooks/use-task-drag-and-drop'

type TaskProperties = {
  readonly index: number
  readonly task: TaskModel
  readonly onUpdate: (id: TaskModel['_id'], updatedTask: TaskModel) => void
  readonly onDelete: (id: TaskModel['_id']) => void
  readonly onDropHover: (index: number, index_: number) => void
}

const TaskCardComponent = ({
  index,
  task,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
}: TaskProperties) => {
  const { ref } = useTaskDragAndDrop<HTMLDivElement>({ task, index }, handleDropHover)
  const setTaskDrawer = useSetRecoilState(taskDrawerAtom)
  const setTaskDrawerId = useSetRecoilState(taskDrawerIdAtom)

  const handleTitleChange = (event: React.ChangeEvent<HTMLParagraphElement>) => {
    const newTitle = event.target.textContent ?? task.title
    handleUpdate(task._id, { ...task, title: newTitle })
  }

  const handleTaskDelete = () => {
    handleDelete(task._id)
  }

  return (
    <ScaleFade unmountOnExit in>
      <Box
        ref={ref}
        as="div"
        role="group"
        w="100%"
        position="relative"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        onClick={() => {
          setTaskDrawer(task)
          setTaskDrawerId(task._id)
        }}
      >
        <KanbanTaskCard.Root display="flex" h={114} taskPriority={task.priority as TaskPriority}>
          <VStack w="100%" justifyContent="space-between">
            <HStack w="100%">
              <KanbanTaskCard.Content title={task.title} w="100%" onChange={handleTitleChange} />
              <KanbanTaskCard.Actions onDelete={handleTaskDelete} />
            </HStack>
            <KanbanTaskCard.Metadata
              dueDate={task.dueDate}
              priority={task.priority as TaskPriority}
              ownerId={task.owner}
              status={task.status}
            />
          </VStack>
        </KanbanTaskCard.Root>
      </Box>
    </ScaleFade>
  )
}

export default memo(TaskCardComponent, (previous, next) => {
  if (
    _.isEqual(previous.task, next.task) &&
    _.isEqual(previous.index, next.index) &&
    previous.onDelete === next.onDelete &&
    previous.onDropHover === next.onDropHover &&
    previous.onUpdate === next.onUpdate
  ) {
    return true
  }

  return false
})
