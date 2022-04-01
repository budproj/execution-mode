import { Box, Checkbox, EditablePreviewProps, HStack, Skeleton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

import { EditableInputField } from 'src/components/Base'
import { TASK_STATUS } from 'src/components/Task/constants'
import { useChangeTaskDescription } from 'src/components/Task/hooks'
import { Task } from 'src/components/Task/types'

import { DeleteButton } from '../Base/Button/delete-button'

interface SingleTaskProperties {
  task: Task
  taskState?: string
  isLoaded?: boolean
  onCheckboxClick?: (taskId: Task['id']) => Promise<void>
  onTaskDelete?: (taskId: Task['id']) => Promise<void>
}

const StyledSingleTask = styled(HStack)`
  & .deleteCheckMarkButton {
    opacity: 0;
  }

  &:hover .deleteCheckMarkButton {
    opacity: 1;
  }
`

export const SingleTask = ({
  task,
  isLoaded = true,
  onCheckboxClick,
  onTaskDelete,
  taskState,
}: SingleTaskProperties) => {
  const onlyUnchecked = taskState === TASK_STATUS.UNCHECKED
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(task.state === TASK_STATUS.CHECKED)
  const { changeDescription } = useChangeTaskDescription({ onlyUnchecked })

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    setIsEditing(false)
  }

  const toggleTask = async () => {
    setIsLoading(true)
    setIsChecked(!isChecked)

    if (onCheckboxClick) {
      await onCheckboxClick(task.id)
    }

    setIsLoading(false)
  }

  const onDeleteClick = async () => {
    setIsLoading(true)

    if (onTaskDelete) {
      await onTaskDelete(task.id)
    }

    setIsLoading(false)
  }

  const handleSubmit = (taskName: Task['description'] | undefined) => {
    if (taskName) {
      changeDescription({ variables: { id: task.id, description: taskName } })
    }
  }

  const checkedProperties: EditablePreviewProps = {
    color: 'new-gray.800',
    textDecoration: 'line-through',
  }

  return (
    <Skeleton isLoaded={isLoaded} w="full" fadeDuration={0}>
      <StyledSingleTask alignItems="center">
        <Box py={1} mr={2} display={isEditing ? 'none' : undefined}>
          <Checkbox isChecked={isChecked} isDisabled={false} onChange={toggleTask} />
        </Box>
        <EditableInputField
          isLoaded={isLoaded}
          autoFocus={false}
          isWaiting={isLoading}
          value={task.description}
          startWithEditView={false}
          isDisabled={false}
          previewProperties={isChecked ? checkedProperties : undefined}
          onSubmit={handleSubmit}
          onCancel={handleStopEdit}
          onPressedEnter={handleSubmit}
          onStartEdit={handleStartEdit}
          onStopEdit={handleStopEdit}
        />
        <DeleteButton canDelete className="deleteCheckMarkButton" onDelete={onDeleteClick} />
      </StyledSingleTask>
    </Skeleton>
  )
}
