import { USER_GENDER } from '../../../components/User/constants'
import { GraphQLConnection, GraphQLEdge } from '../../../components/types'

import { AmplitudeUser, AmplitudeUserGroups } from './types'

type MinimumUser = {
  id: string
  fullName: string
  email: string
  gender: USER_GENDER
  role: string
  createdAt: string
  companies: GraphQLConnection<MinimumGroup>
  teams: GraphQLConnection<MinimumGroup>
}

interface MinimumGroup {
  id: string
  name: string
  createdAt: string
}

export const marshalAmplitudeUser = (user: MinimumUser): AmplitudeUser => ({
  id: user.id,
  name: user.fullName,
  email: user.email,
  gender: user.gender,
  role: user.role,
  createdAt: user.createdAt,
})

export const marshalAmplitudeUserGroups = (user: MinimumUser): AmplitudeUserGroups => ({
  companies: getGroupNames(user.companies.edges),
  teams: getGroupNames(user.teams.edges),
})

const getGroupNames = (groupEdges: Array<GraphQLEdge<MinimumGroup>>): string[] =>
  groupEdges.map((edge) => edge.node.name)
