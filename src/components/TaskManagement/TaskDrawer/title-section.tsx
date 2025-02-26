import { Text, EditablePreview, Input, Editable, EditableInput } from '@chakra-ui/react'
import React from 'react'

import { EditableControls } from 'src/components/Base/EditableControls/wrapper'
import { Task } from 'src/services/new-task-management/new-task-management.service'

interface TaskTitleSectionProperties {
  task: Task
  teamId: string
  updateTask: (id: Task['id'], teamId: string, updatedTask: Partial<Task>) => void
}

export const TaskTitleSection = ({ task, teamId, updateTask }: TaskTitleSectionProperties) => {
  const handleSubmit = (value: string) => {
    updateTask(task.id, teamId, { id: task.id, title: value })
  }

  return (
    <Editable
      defaultValue={task?.title}
      selectAllOnFocus={false}
      display="flex"
      onSubmit={handleSubmit}
    >
      <EditablePreview
        as={Text}
        color="new-gray.900"
        _hover={{ color: 'brand.500' }}
        fontWeight={500}
        fontSize="24px"
        maxWidth="100%"
      />
      <Input py={2} px={4} mt={2} mr="2" as={EditableInput} />
      <EditableControls />
    </Editable>
  )
}
