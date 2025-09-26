import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export function useGetTeamCyclesDate(teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`taskManager:getTeamCycles:${teamId}`],
    queryFn: async () => {
      const { cycle } = await servicesPromise
      const data = await cycle.getTeamAllCycles(teamId)
      return data
    },
  })

  return query
}
