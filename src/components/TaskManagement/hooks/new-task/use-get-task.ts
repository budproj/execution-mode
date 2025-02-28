import { ParsedUrlQuery } from 'querystring'

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getTask'
export function useTeamTasksData(taskId: string, teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${teamId}`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getTask(taskId, teamId)
      return data
    },
  })

  return query
}
