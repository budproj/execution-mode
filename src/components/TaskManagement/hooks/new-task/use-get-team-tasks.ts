import { ParsedUrlQuery } from 'querystring'

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getAllTasks'

export function useTeamTasksData(parameters: ParsedUrlQuery) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    queryKey: [`${MODULE}:${ACTION}:${parameters.teamId}`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getAllTasks(parameters)
      return data
    },
  })

  return query
}
