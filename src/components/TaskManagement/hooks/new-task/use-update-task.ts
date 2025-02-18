import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Task } from 'src/services/task-management/task-management.service'

const MODULE = 'taskManager'
const ACTION = 'addTask'

export function useUpdateTask(teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const updateTaskMutate = useMutation({
    mutationFn: async (data: Partial<Task>) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.updateTask(teamId, data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}:${teamId}`] })
    },
  })
  return updateTaskMutate
}
