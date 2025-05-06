import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskUpdate } from 'src/services/new-task-management/@types/task-update.type'

export function useUpdateTask() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const updateTaskMutate = useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: Partial<TaskUpdate> }) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.updateTask(taskId, data)
      return response
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [`taskManager:getAllTasks`] })
      queryClient.invalidateQueries({ queryKey: [`taskManager:getTask:${variables.taskId}`] })
    },
  })
  return updateTaskMutate
}
