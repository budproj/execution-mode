import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'cycle'
const ACTION = 'getCompanyCycles'

export function useCycleByCompany(company_id?: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}`, company_id],
    queryFn: async () => {
      const { cycle } = await servicesPromise
      const data = await cycle.getTeamCycle(company_id ?? '')
      return data
    },
    enabled: Boolean(company_id),
  })

  return query
}
