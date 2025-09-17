import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskInsert } from 'src/services/task-management/task-management.service'

export function useAddTask() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const addTaskToTeamMutate = useMutation({
    mutationFn: async ({ data }: { data: TaskInsert }) => {
      const { taskManagement } = await servicesPromise
      const response = await taskManagement.addTask(data)
      return response
    },
    onSuccess: (_data, _variables) => {
      queryClient.invalidateQueries({ queryKey: [`taskManager:getAllTasks`] })
    },
  })

  return addTaskToTeamMutate
}
