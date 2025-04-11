import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getTask'
export function useTeamTasksData(taskId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${taskId}`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getTask(taskId)
      return data
    },
  })

  return query
}
