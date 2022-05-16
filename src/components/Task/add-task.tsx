import { Box, StyleProps } from '@chakra-ui/react'
import React, { useState } from 'react'

import { Button, BUTTON_ICON_OPTIONS } from 'src/components/Base/Button'
import { useCreateTask } from 'src/components/Task/hooks'
import { EventType } from 'src/state/hooks/useEvent/event-type'
import { useEvent } from 'src/state/hooks/useEvent/hook'

import { EditableInputField } from '../Base'

import { Task } from './types'

interface AddTaskProperties extends StyleProps {
  buttonText: string
  hasIcon?: boolean
}

export const AddTask = ({ buttonText, hasIcon = true, ...rest }: AddTaskProperties) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { createTask } = useCreateTask()
  const { dispatch } = useEvent(EventType.CREATED_PERSONAL_TASK)

  const handleCreate = async (description: Task['description']) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    dispatch({})

    await createTask({
      variables: {
        description,
      },
    })

    setIsSubmitting(false)
    toggleAdd()
  }

  const toggleAdd = () => {
    setIsAdding(!isAdding)
  }

  const previewProperties = {
    border: '2px solid #E3E8EE',
    width: '100%',
    padding: '0.5rem',
  }

  return (
    <Box {...rest}>
      {isAdding && (
        <EditableInputField
          startWithEditView
          value=""
          isSubmitting={isSubmitting}
          previewProperties={previewProperties}
          onSubmit={handleCreate}
          onCancel={toggleAdd}
        />
      )}
      <Button
        label={buttonText}
        icon={hasIcon ? BUTTON_ICON_OPTIONS.PLUS_OUTLINE : undefined}
        mt={3}
        onClick={toggleAdd}
      />
    </Box>
  )
}
