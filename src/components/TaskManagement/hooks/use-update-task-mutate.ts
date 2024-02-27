import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Task } from 'src/services/task-management/task-management.service'

import { BOARD_DOMAIN, GET_BOARD_DATA_KEY } from './use-team-tasks-board-data'

export function useUpdateTaskMutate(domain: BOARD_DOMAIN, identifier: string) {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const updateTaskMutate = useMutation({
    mutationFn: async (data: Partial<Task>) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.updateTask(data)
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${GET_BOARD_DATA_KEY}:${domain}:${identifier}`] })
    },
  })
  return updateTaskMutate
}
