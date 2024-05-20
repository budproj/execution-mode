import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

import { ServicesContext } from 'src/components/Base/ServicesProvider/services-provider'

export const GET_BOARD_DATA_KEY = 'board-data'
export enum BOARD_DOMAIN {
  TEAM = 'team',
  PROJECT = 'project',
  USER = 'user',
}

export function useTeamTasksBoardData(teamId: string, archived?: boolean) {
  const { servicesPromise } = useContext(ServicesContext)

  const query = useQuery({
    queryKey: [`${GET_BOARD_DATA_KEY}:${BOARD_DOMAIN.TEAM}:${teamId}`],
    queryFn: async () => {
      const { taskManagement } = await servicesPromise
      const data = await taskManagement.getTeamBoard({ teamId, archived })
      return data
    },
  })

  return query
}
