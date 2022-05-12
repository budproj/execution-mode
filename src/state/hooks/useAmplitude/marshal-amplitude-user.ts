import { UserNamedAvatarDataQuery } from 'src/components/User/Me/me'

import { AmplitudeUser, AmplitudeUserGroups } from './types'

type MinimumGroup = {
  id: string
  name: string
  createdAt: string
}

type MinimumEdge<N> = {
  node: N
}

export const marshalAmplitudeUser = (user: UserNamedAvatarDataQuery): AmplitudeUser => ({
  id: user.id,
  name: user.fullName,
  email: user.email,
  gender: user.gender,
  role: user.role,
  createdAt: user.createdAt,
})

export const marshalAmplitudeUserGroups = (
  user: UserNamedAvatarDataQuery,
): AmplitudeUserGroups => ({
  companies: getGroupNames(user.companies.edges),
  teams: getGroupNames(user.teams.edges),
})

const getGroupNames = (groupEdges: Array<MinimumEdge<MinimumGroup>>): string[] =>
  groupEdges.map((edge) => edge.node.name)
