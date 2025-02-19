import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { NewTask } from 'src/components/Task/types'

export const useUpdateTaskByKr = () => {
  const { servicesPromise } = useContext(ServicesContext)

  return useMutation({
    mutationFn: async ({ newNode }: { newNode: NewTask }) => {
      const { newTaskManagement } = await servicesPromise
      return newTaskManagement.updateTask(newNode)
    },
  })
}
