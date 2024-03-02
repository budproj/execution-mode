import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const GET_TASK_DATA_KEY = 'task-data'
export enum BOARD_DOMAIN {
  TEAM = 'team',
  PROJECT = 'project',
  USER = 'user',
}

export function useGetTask(id: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${GET_TASK_DATA_KEY}:${id}`],
    queryFn: async () => {
      const { taskManagement } = await servicesPromise
      const data = await taskManagement.getTask(id)
      return data
    },
  })

  return query
}
