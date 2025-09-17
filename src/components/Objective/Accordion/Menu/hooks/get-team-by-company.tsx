import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'taskManager'
const ACTION = 'getTask'

export function useTeamByCompany(company_id?: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}`, company_id],
    queryFn: async () => {
      const { team } = await servicesPromise
      const data = await team.getTeamByCompany(company_id ?? '')
      return data
    },
    enabled: Boolean(company_id),
  })

  return query
}
