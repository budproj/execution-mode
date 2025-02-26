import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Task } from 'src/services/task-management/task-management.service'

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
      data: Partial<Task>
    }) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.updateTask(teamId, taskId, data)
      return response
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}:${variables.teamId}`] })
    },
  })
  return updateTaskMutate
}
