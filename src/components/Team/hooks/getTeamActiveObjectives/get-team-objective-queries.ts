import { ApolloQueryResult, OperationVariables, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'

import { Objective } from 'src/components/Objective/types'
import { GraphQLConnection } from 'src/components/types'

import { Team } from '../../types'

import queries from './queries.gql'

interface useGetTeamObjectiveProperties {
  data?: GetTeamActiveObjectivesQuery
  loading: boolean
  called: boolean
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>
}
export interface GetTeamActiveObjectivesQuery {
  team: {
    id: string
    name: string
    activeObjectives: GraphQLConnection<Objective>
    notActiveObjectives: GraphQLConnection<Objective>
  }
}
export const useGetTeamObjective = (teamID?: Team['id']): useGetTeamObjectiveProperties => {
  const [getTeamObjectives, { data, refetch, loading, called }] =
    useLazyQuery<GetTeamActiveObjectivesQuery>(queries.GET_TEAM_ACTIVE_OBJECTIVES, {
      fetchPolicy: 'network-only',
      variables: { teamID },
      notifyOnNetworkStatusChange: true,
    })

  useEffect(() => {
    if (teamID) getTeamObjectives()
  }, [getTeamObjectives, teamID])

  return { data, loading, refetch, called }
}
