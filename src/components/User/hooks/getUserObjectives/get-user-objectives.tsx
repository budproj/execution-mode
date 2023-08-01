import { useQuery } from '@apollo/client'

import { Objective } from 'src/components/Objective/types'
import { GraphQLConnectionPolicy, GraphQLEdge } from 'src/components/types'

import { User, UserMeQuery } from '../../types'

import GET_OBJECTIVES from './get-user-objectives.gql'

interface GetUserObjectivesFilters {
  ownerId: User['id']
  teamId?: null
  active?: boolean
}

interface GetUserObjectivesActions {
  setObjetives?: (objectives: Array<GraphQLEdge<Objective>>) => void
  setObjectivesPolicy?: (objectives: GraphQLConnectionPolicy) => void
}

export const useGetUserObjectives = (
  filters: GetUserObjectivesFilters,
  actions: GetUserObjectivesActions,
) => {
  const { loading, called, refetch } = useQuery<UserMeQuery>(GET_OBJECTIVES, {
    fetchPolicy: 'cache-first',
    variables: {
      // eslint-disable-next-line unicorn/no-null
      teamId: null,
      active: true,
      ...filters,
    },
    onCompleted: ({ me }) => {
      const userCompany = me?.companies?.edges[0]
      const objectives = userCompany?.node?.objectives?.edges ?? []
      if (actions.setObjetives) {
        actions.setObjetives(objectives)
      }

      const objectivePolicy = userCompany?.node?.objectives?.policy
      if (objectivePolicy && actions.setObjectivesPolicy) {
        actions.setObjectivesPolicy(objectivePolicy)
      }
    },
  })

  return { loading, called, refetch }
}
