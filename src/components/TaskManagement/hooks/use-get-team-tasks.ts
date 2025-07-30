import { ParsedUrlQuery } from 'querystring'

import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export function useTeamTasksData(parameters: ParsedUrlQuery) {
  const { servicesPromise } = useContext(ServicesContext)

  const parameters_ = {
    ...parameters,
    deleted_at__isnull: 'True',
  }
  const query = useQuery({
    queryKey: [`taskManager:getAllTasks`, parameters],
    queryFn: async () => {
      const { taskManagement } = await servicesPromise
      const data = await taskManagement.getAllTasks(parameters_)
      return data
    },
  })

  return query
}
