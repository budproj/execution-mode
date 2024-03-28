import { Flex, IconButton, Input, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import React, { useState } from 'react'

import CheckIcon from 'src/components/Icon/Check'
import TimesIcon from 'src/components/Icon/Times'
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
  const formatedDate = format(new Date(task.dueDate), 'dd/MM/yyyy')

  const [value, setValue] = useState(formatedDate)
  const [editMode, setEditMode] = useState(false)

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
    setValue(formatedDate)
  }

  const handleSubmit = () => {
    const isValid = isDateValid(value)
    if (!isValid) {
      handleCancel()
      return
    }

    updateTask(task._id, { _id: task._id, dueDate: new Date(value) })
    setValue(format(new Date(value), 'dd/MM/yyyy'))
    setEditMode(false)
  }

  function isDateValid(dateString: string): boolean {
    const parsedDate = Date.parse(dateString)
    return !Number.isNaN(parsedDate)
  }

  return editMode ? (
    <Flex>
      <StyledDateInput
        type="date"
        marginRight={5}
        defaultValue={format(new Date(task.dueDate), 'yyyy-MM-dd')}
        onChange={(event) => setValue(event.target.value)}
      />
      <Flex gap={3}>
        <IconButton
          variant="solid"
          h={12}
          w={12}
          fontSize="2xl"
          borderColor="transparent"
          type="submit"
          icon={<CheckIcon desc="x" fill="currentColor" />}
          aria-label=""
          color="white"
          bg="brand.500"
          _hover={{
            bg: 'brand.400',
          }}
          _active={{
            bg: 'brand.300',
          }}
          onClick={handleSubmit}
        />
        <IconButton
          variant="solid"
          h={12}
          w={12}
          fontSize="2xl"
          bg="black.100"
          color="gray.500"
          borderColor="transparent"
          _hover={{
            color: 'white',
            bg: 'red.500',
          }}
          _active={{
            color: 'white',
            bg: 'red.400',
          }}
          icon={<TimesIcon desc="X" fill="currentColor" />}
          aria-label=""
          onClick={handleCancel}
        />
      </Flex>
    </Flex>
  ) : (
    <Text onClick={handleEdit}>{value}</Text>
  )
}
