import { ParsedUrlQuery } from 'querystring'

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const ACTION = 'getAllTasks'

export function useTeamTasksData(parameters: ParsedUrlQuery) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${ACTION}`],
    queryFn: async () => {
      const { newTaskManagement } = await servicesPromise
      const data = await newTaskManagement.getAllTasks(parameters)
      return data
    },
  })

  return query
}
