import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { NewTask } from 'src/components/Task/types'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

export function useUpdateTask() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const updateTaskMutate = useMutation({
    mutationFn: async ({
      teamId,
      taskId,
      data,
    }: {
      teamId: string
      taskId: string
      data: Partial<NewTask>
    }) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.updateTaskByKr(teamId, taskId, data)
      return response
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}:${variables.teamId}`] })
    },
  })
  return updateTaskMutate
}
