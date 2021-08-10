import { USER_GENDER } from '../../../components/User/constants'

import { AmplitudeUser, AmplitudeUserGroups } from './types'

type MinimumUser = {
  id: string
  fullName: string
  email: string
  gender: USER_GENDER
  role: string
  createdAt: string
  companies: MinimumConnection<MinimumGroup>
  teams: MinimumConnection<MinimumGroup>
}

type MinimumGroup = {
  id: string
  name: string
  createdAt: string
}

type MinimumConnection<N> = {
  edges: Array<MinimumEdge<N>>
}

type MinimumEdge<N> = {
  node: N
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

const getGroupNames = (groupEdges: Array<MinimumEdge<MinimumGroup>>): string[] =>
  groupEdges.map((edge) => edge.node.name)
