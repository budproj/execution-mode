import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const MODULE = 'KeyResult'
const ACTION = 'getOwnerWithTasks'

export function useOwnerKRWithTasks(owner: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${MODULE}:${ACTION}:${owner}`],
    queryFn: async () => {
      const { keyResult } = await servicesPromise
      const data = await keyResult.getKeyResultByOwnerWithTasks(owner)
      return data
    },
  })

  return query
}
