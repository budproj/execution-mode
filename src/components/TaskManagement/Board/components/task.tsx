import { Box, IconButton, ScaleFade } from '@chakra-ui/react'
import _ from 'lodash'
import React, { memo } from 'react'

import { TrashBin } from 'src/components/Icon'

import useTaskDragAndDrop from '../hooks/use-task-drag-and-drop'
import { TaskModel } from '../utils/models'

import AutoResizeTextarea from './auto-resize-text-area'

type TaskProperties = {
  index: number
  task: TaskModel
  onUpdate: (id: TaskModel['id'], updatedTask: TaskModel) => void
  onDelete: (id: TaskModel['id']) => void
  onDropHover: (index: number, index_: number) => void
}

const Task = ({
  index,
  task,
  onUpdate: handleUpdate,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
}: TaskProperties) => {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({ task, index }, handleDropHover)

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTitle = event.target.value
    handleUpdate(task.id, { ...task, title: newTitle })
  }

  const handleDeleteClick = () => {
    handleDelete(task.id)
  }

  return (
    <ScaleFade unmountOnExit in>
      <Box
        ref={ref}
        as="div"
        role="group"
        position="relative"
        rounded="lg"
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        boxShadow="xl"
        cursor="grab"
        fontWeight="bold"
        userSelect="none"
        bgColor={task.color}
        opacity={isDragging ? 0.5 : 1}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="md"
          colorScheme="solid"
          color="gray.700"
          icon={<TrashBin desc="dsads" />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDeleteClick}
        />
        <AutoResizeTextarea
          value={task.title}
          fontWeight="semibold"
          cursor="inherit"
          border="none"
          p={0}
          resize="none"
          minH={70}
          maxH={200}
          focusBorderColor="none"
          color="gray.700"
          onChange={handleTitleChange}
        />
      </Box>
    </ScaleFade>
  )
}

export default memo(Task, (previous, next) => {
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
