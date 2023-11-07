import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

const BOARD_DATA_KEY = 'board-data'

export function useBoardData(teamId: string) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [BOARD_DATA_KEY],
    queryFn: async () => {
      const { taskManagement } = await servicesPromise
      const data = await taskManagement.getTeamBoard({ teamId })
      return data
    },
  })

  return query
}
