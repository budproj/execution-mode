import { ParsedUrlQuery } from 'querystring'

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

export function useTeamTasksData(teamId: string, parameters: ParsedUrlQuery) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${teamId}`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getAllTasks(teamId, parameters)
      return data
    },
  })

  return query
}
