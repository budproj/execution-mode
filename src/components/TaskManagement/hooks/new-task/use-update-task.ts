import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { Task } from 'src/services/new-task-management/new-task-management.service'

export function useUpdateTask() {
  const { servicesPromise } = useContext(ServicesContext)

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
  })
  return updateTaskMutate
}
