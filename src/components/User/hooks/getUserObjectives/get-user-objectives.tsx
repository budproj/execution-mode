import { useQuery } from '@apollo/client'

import { Objective } from 'src/components/Objective/types'
import { GraphQLConnectionPolicy, GraphQLEdge } from 'src/components/types'

import { User, UserMeQuery } from '../../types'

import GET_OBJECTIVES from './get-user-objectives.gql'

type UserPersonalOKRsQueryOutput = UserMeQuery & {
  objectives: {
    edges: Array<GraphQLEdge<Objective>>
  }
}

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
  const { loading, called, refetch } = useQuery<UserPersonalOKRsQueryOutput>(GET_OBJECTIVES, {
    variables: {
      // eslint-disable-next-line unicorn/no-null
      teamId: null,
      active: true,
      ...filters,
    },
    onCompleted: ({ objectives, me }) => {
      const userCompany = me?.companies?.edges[0]

      if (actions.setObjetives) {
        actions.setObjetives(objectives.edges)
      }

      const objectivePolicy = userCompany?.node?.objectives?.policy
      if (objectivePolicy && actions.setObjectivesPolicy) {
        actions.setObjectivesPolicy(objectivePolicy)
      }
    },
  })

  return { loading, called, refetch }
}
