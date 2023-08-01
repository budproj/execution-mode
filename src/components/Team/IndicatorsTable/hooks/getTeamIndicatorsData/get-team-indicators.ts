import { LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { teamIndicatorsTableData } from 'src/state/recoil/team/indicators/team-indicators-table-data'

import { teamIndicatorsDataMapper } from '../../utils/data-mappers'

import GET_TEAM_INDICATORS from './get-team-indicators.gql'

type getTeamIndicatorsQuery = {
  team?: Team
}

interface GetUserListProperties {
  loading: boolean
  fetchTeamIndicators: LazyQueryExecFunction<getTeamIndicatorsQuery, OperationVariables>
}

export const useGetTeamIndicators = (
  teamId: Team['id'],
  allUsers = false,
): GetUserListProperties => {
  const setTeamIndicators = useSetRecoilState(teamIndicatorsTableData)

  const [fetchTeamIndicators, { loading }] = useLazyQuery<getTeamIndicatorsQuery>(
    GET_TEAM_INDICATORS,
    {
      fetchPolicy: 'network-only',
      variables: {
        teamId,
        allUsers,
      },
      onCompleted: (data) => {
        const teamUsers = data.team?.users?.edges.map((user) => user.node)

        if (teamUsers) {
          const mappedTeamIndicatorsData = teamIndicatorsDataMapper.toFront(teamUsers)
          setTeamIndicators(mappedTeamIndicatorsData)
        }
      },
    },
  )

  return { loading, fetchTeamIndicators }
}
