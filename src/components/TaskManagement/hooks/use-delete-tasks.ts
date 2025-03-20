import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const useDeleteTaskByKr = () => {
  const { servicesPromise } = useContext(ServicesContext)

  return useMutation({
    mutationFn: async ({ taskID }: { taskID: string }) => {
      const { newTaskManagement } = await servicesPromise
      return newTaskManagement.removeTask(taskID)
    },
  })
}
