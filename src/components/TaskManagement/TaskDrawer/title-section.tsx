import { Text, EditablePreview, Input, Editable, EditableInput } from '@chakra-ui/react'
import React from 'react'

import { EditableControls } from 'src/components/Base/EditableControls/wrapper'
import { TaskUpdate } from 'src/services/task-management/@types/task-update.type'
import { Task } from 'src/services/task-management/@types/task.type'

interface TaskTitleSectionProperties {
  task: Task
  updateTask: (id: Task['id'], updatedTask: Partial<TaskUpdate>) => void
}

export const TaskTitleSection = ({ task, updateTask }: TaskTitleSectionProperties) => {
  const handleSubmit = (value: string) => {
    updateTask(task.id, { id: task.id, title: value })
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
