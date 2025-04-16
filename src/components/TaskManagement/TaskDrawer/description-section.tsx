import { EditorEvents } from '@tiptap/react'
import React, { useCallback, useState } from 'react'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'
import { Task, TaskUpdate } from 'src/services/new-task-management/new-task-management.service'

interface TaskDescriptionSectionProperties {
  task: Task
  updateTask: (id: Task['id'], updatedTask: Partial<TaskUpdate>) => void
}

export const TaskDescriptionSection = ({ task, updateTask }: TaskDescriptionSectionProperties) => {
  const [newDescriptionValue, setValue] = useState(task.description)

  const handleSubmit = () => {
    updateTask(task.id, { id: task.id, description: newDescriptionValue })
  }

  const handleUpdate = useCallback((parameters: EditorEvents['update']) => {
    const { editor } = parameters
    const timer = setTimeout(async () => setValue(editor.getHTML()), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Editor isFromDrawer content={task.description} onUpdate={handleUpdate} onSave={handleSubmit} />
  )
}
