import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskUpdate } from 'src/services/new-task-management/new-task-management.service'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

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
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}:${variables.data.team}`] })
    },
  })
  return updateTaskMutate
}
