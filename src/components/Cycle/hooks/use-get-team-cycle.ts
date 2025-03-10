import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'Cycle'
const ACTION = 'getAllTeamCycle'

export function useTeamCycleData(teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${teamId}`],
    queryFn: async () => {
      const { cycle } = await servicesPromise
      const data = await cycle.getCycleTeam(teamId)
      return data
    },
  })

  return query
}
