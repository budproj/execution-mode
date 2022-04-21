import { Box, Checkbox, EditablePreviewProps, HStack, Skeleton } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useState } from 'react'

import { EditableInputField } from 'src/components/Base'
import { TASK_STATUS } from 'src/components/Task/constants'
import { useChangeTaskDescription } from 'src/components/Task/hooks'
import { Task } from 'src/components/Task/types'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { DeleteButton } from '../Base/Button/delete-button'

interface SingleTaskProperties {
  task: Task
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
}: SingleTaskProperties) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(task.state === TASK_STATUS.CHECKED)
  const { changeDescription } = useChangeTaskDescription()
  const { dispatch: dispatchUpdateTitleEvent } = useEvent(EventType.UPDATED_PERSONAL_TASK_TITLE)
  const { dispatch: dispatchToggleEvent } = useEvent(EventType.TOGGLED_PERSONAL_TASK)
  const { dispatch: dispatchDeleteEvent } = useEvent(EventType.DELETED_PERSONAL_TASK)

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    setIsEditing(false)
  }

  const toggleTask = async () => {
    setIsLoading(true)

    dispatchToggleEvent({
      taskId: task.id,
      previousState: isChecked ? 'checked' : 'unchecked',
      newState: isChecked ? 'unchecked' : 'checked',
    })

    setIsChecked(!isChecked)

    if (onCheckboxClick) {
      await onCheckboxClick(task.id)
    }

    setIsLoading(false)
  }

  const onDeleteClick = async () => {
    setIsLoading(true)
    dispatchDeleteEvent({
      taskId: task.id,
    })

    if (onTaskDelete) {
      await onTaskDelete(task.id)
    }

    setIsLoading(false)
  }

  const handleSubmit = (taskName: Task['description'] | undefined) => {
    dispatchUpdateTitleEvent({
      taskId: task.id,
      newTitleLength: taskName?.length ?? 0,
    })

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
