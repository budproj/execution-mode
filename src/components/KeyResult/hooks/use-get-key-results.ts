import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'KeyResult'
const ACTION = 'getKeyResultbyId'

export function useKRDataById(keyResultId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${keyResultId}`],
    queryFn: async () => {
      const { keyResult } = await servicesPromise
      const data = await keyResult.getKeyResultById(keyResultId)
      return data
    },
  })

  return query
}
