import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const useDeleteTask = () => {
  const { servicesPromise } = useContext(ServicesContext)

  return useMutation({
    mutationFn: async ({ teamId, taskId }: { teamId: string; taskId: string }) => {
      const { newTaskManagement } = await servicesPromise
      return newTaskManagement.removeTask(teamId, taskId)
    },
  })
}