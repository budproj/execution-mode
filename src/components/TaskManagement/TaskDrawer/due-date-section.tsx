import { EditablePreview, Editable, Input, EditableInput, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import React, { useCallback, useState } from 'react'

import { EditableControls } from 'src/components/Base/EditableControls/wrapper'
import { Task } from 'src/services/task-management/task-management.service'

interface TaskTitleSectionProperties {
  task: Task
  updateTask: (_id: Task['_id'], updatedTask: Partial<Task>) => void
}

const StyledDateInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`

export const DueDateSection = ({ task, updateTask }: TaskTitleSectionProperties) => {
  const [dueDateValue, setDueDateValue] = useState(format(new Date(task.dueDate), 'dd/MM/yyyy'))

  const handleSubmit = useCallback(
    (value: string) => {
      const changedDate = new Date(value)

      updateTask(task._id, { _id: task._id, dueDate: changedDate })
      setDueDateValue(format(new Date(value), 'dd/MM/yyyy'))
    },
    [task, updateTask],
  )

  return (
    <Editable
      defaultValue={dueDateValue}
      display="flex"
      submitOnBlur={false}
      onSubmit={handleSubmit}
    >
      <EditablePreview
        color="new-gray.900"
        _hover={{ color: 'brand.500' }}
        fontWeight={500}
        fontSize="24px"
        as={Box}
      />

      <StyledDateInput py={2} px={4} mt={2} mr="2" type="date" as={EditableInput} />
      <EditableControls />
    </Editable>
  )
}
