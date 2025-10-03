import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'keyResult'
const ACTION = 'getTeamObjectives'

export function useListObjectives(isPersonal: boolean, userId: string, teamId?: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}`, teamId],
    queryFn: async () => {
      const { objective } = await servicesPromise
      const data = isPersonal
        ? await objective.listPersonalObjectives(userId)
        : await objective.listObjectivesByTeamId(teamId ?? '')
      return data
    },
    enabled: Boolean(teamId),
  })

  return query
}
