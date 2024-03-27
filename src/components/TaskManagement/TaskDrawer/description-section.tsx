import { EditorEvents } from '@tiptap/react'
import React, { useCallback, useState } from 'react'

import Editor from 'src/components/Base/TipTapEditor/tip-tap-editor'
import { Task } from 'src/services/task-management/task-management.service'

interface TaskDescriptionSectionProperties {
  task: Task
  updateTask: (_id: Task['_id'], updatedTask: Partial<Task>) => void
}

export const TaskDescriptionSection = ({ task, updateTask }: TaskDescriptionSectionProperties) => {
  const [newDescriptionValue, setValue] = useState(task.description)

  const handleSubmit = () => {
    updateTask(task._id, { _id: task._id, description: newDescriptionValue })
  }

  const handleUpdate = useCallback((parameters: EditorEvents['update']) => {
    const { editor } = parameters

    // TODO: a debounce would be nice here
    const timer = setTimeout(async () => setValue(editor.getHTML()), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Editor isFromDrawer content={task.description} onUpdate={handleUpdate} onSave={handleSubmit} />
  )
}
