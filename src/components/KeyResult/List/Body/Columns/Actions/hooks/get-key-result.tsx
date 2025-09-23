import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'keyResult'
const ACTION = 'getKeyResult'

export function useGetKeyResult(id?: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}`, id],
    queryFn: async () => {
      const { keyResult } = await servicesPromise
      const data = await keyResult.getKeyResultById(id ?? '')
      return data
    },
    enabled: Boolean(id),
  })

  return query
}
