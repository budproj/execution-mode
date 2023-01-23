import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { Team } from 'src/components/Team/types'

import { TeamIndicators } from '../../types'
import { teamIndicatorsDataMapper } from '../../utils/data-mappers'

import GET_TEAM_INDICATORS from './get-team-indicators.gql'

type getTeamIndicatorsQuery = {
  team?: Team
}

interface GetUserListProperties {
  data?: TeamIndicators[]
  loading: boolean
  called: boolean
}

export const useGetTeamIndicators = (teamId: Team['id']): GetUserListProperties => {
  const [teamIndicators, setTeamIndicators] = useState<TeamIndicators[]>()

  const { loading, called } = useQuery<getTeamIndicatorsQuery>(GET_TEAM_INDICATORS, {
    fetchPolicy: 'network-only',
    variables: {
      teamId,
    },
    onCompleted: (data) => {
      const teamUsers = data.team?.users?.edges.map((user) => user.node)

      if (teamUsers) {
        const mappedTeamIndicatorsData = teamIndicatorsDataMapper.toFront(teamUsers)
        setTeamIndicators(mappedTeamIndicatorsData)
      }
    },
  })

  return { data: teamIndicators, loading, called }
}
