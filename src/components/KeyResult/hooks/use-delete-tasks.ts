import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const useDeleteTaskByKr = () => {
  const { servicesPromise } = useContext(ServicesContext)

  return useMutation({
    mutationFn: async ({ taskID }: { taskID: string }) => {
      const { taskManagement } = await servicesPromise
      return taskManagement.removeTask(taskID)
    },
  })
}
