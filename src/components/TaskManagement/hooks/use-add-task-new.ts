import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'
import { TaskInsert } from 'src/services/new-task-management/new-task-management.service'

export function useAddTask() {
  const { servicesPromise } = useContext(ServicesContext)

  const addTaskToKrMutate = useMutation({
    mutationFn: async (data: TaskInsert) => {
      const { newTaskManagement } = await servicesPromise
      const response = await newTaskManagement.addTask(data)
      return response
    },
  })
  return addTaskToKrMutate
}
