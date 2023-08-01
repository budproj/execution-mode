import { LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client'
import { useSetRecoilState } from 'recoil'

import { Team } from 'src/components/Team/types'
import { CSVIndicatorsData } from 'src/state/recoil/team/indicators/csv-indicators-data'

import GET_TEAM_INDICATORS from './get-team-indicators.gql'

type getTeamIndicatorsQuery = {
  team?: Team
}

interface GetUserListProperties {
  loading: boolean
  fetchTeamIndicators: LazyQueryExecFunction<getTeamIndicatorsQuery, OperationVariables>
}

export const useGetTeamCSVData = (teamId: Team['id'], allUsers = false): GetUserListProperties => {
  const setCSVIndicatorData = useSetRecoilState(CSVIndicatorsData)

  const [fetchTeamIndicators, { loading }] = useLazyQuery<getTeamIndicatorsQuery>(
    GET_TEAM_INDICATORS,
    {
      fetchPolicy: 'cache-first',
      variables: {
        teamId,
        allUsers,
      },
      onCompleted: (data) => {
        const teamUsers = data.team?.users?.edges.map((user) => user.node)
        if (teamUsers) {
          setCSVIndicatorData(teamUsers)
        }
      },
    },
  )

  return { loading, fetchTeamIndicators }
}
