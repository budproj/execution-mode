import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

export const useDeleteTask = () => {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const { newTaskManagement } = await servicesPromise
      return newTaskManagement.removeTask(taskId)
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}`] })
    },
  })
}
