import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Task } from 'src/services/task-management/task-management.service'

import { BOARD_DOMAIN, GET_BOARD_DATA_KEY } from './use-team-tasks-board-data'

export function useRemoveTaskMutate(domain: BOARD_DOMAIN, identifier: string) {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const removeTaskMutate = useMutation({
    mutationFn: async (id: Task['_id']) => {
      const { taskManagement } = await servicesPromise
      await taskManagement.removeTask(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${GET_BOARD_DATA_KEY}:${domain}:${identifier}`] })
    },
  })
  return removeTaskMutate
}
