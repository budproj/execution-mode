import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const TASK_UPDATES_DATA_KEY = 'task-updates-data'

export function useGetTaskUpdates(taskId?: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${TASK_UPDATES_DATA_KEY}:${taskId ? taskId : ''}`],
    queryFn: async () => {
      const { taskManagement } = await servicesPromise
      const taskUpdatesRequest = await taskManagement.getTaskUpdates(taskId)
      return taskUpdatesRequest
    },
  })

  return query
}
