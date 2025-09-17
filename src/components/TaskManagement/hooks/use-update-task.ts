import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskUpdate } from 'src/services/task-management/@types/task-update.type'

export function useUpdateTask() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const updateTaskMutate = useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: Partial<TaskUpdate> }) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.updateTask(taskId, data)
      return response
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({ queryKey: [`taskManager:getAllTasks`] })
      queryClient.invalidateQueries({ queryKey: [`taskManager:getTask:${_variables.taskId}`] })
    },
  })
  return updateTaskMutate
}
