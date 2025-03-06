import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskInsert } from 'src/services/new-task-management/new-task-management.service'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

export function useAddTask() {
  const { servicesPromise } = useContext(ServicesContext)
  const queryClient = useQueryClient()

  const addTaskToTeamMutate = useMutation({
    mutationFn: async ({ teamId, data }: { teamId: string; data: TaskInsert }) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.addTask(teamId, data)
      return response
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [`${MODULE}:${ACTION}:${variables.teamId}`] })
    },
  })

  return addTaskToTeamMutate
}
