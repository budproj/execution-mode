import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'KeyResult'
const ACTION = 'getAllTeamKR'

export function useTeamKRData(teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${teamId}`],
    queryFn: async () => {
      const { keyResult } = await servicesPromise
      const data = await keyResult.getKeyResultTeam(teamId)
      return data
    },
  })

  return query
}
