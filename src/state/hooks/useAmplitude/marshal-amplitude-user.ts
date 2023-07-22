import { Myself } from '../../recoil/shared/types'

import { AmplitudeUser, AmplitudeUserGroups } from './types'

type MinimumGroup = {
  id: string
  name: string
  createdAt: string
}

type MinimumEdge<N> = {
  node: N
}

export const marshalAmplitudeUser = (user: Myself): AmplitudeUser => ({
  id: user.id,
  name: user.fullName,
  email: user.email,
  gender: user.gender,
  role: user.role,
  isTeamLeader: user.isTeamLeader,
  createdAt: user.createdAt,
})

export const marshalAmplitudeUserGroups = (user: Myself): AmplitudeUserGroups => ({
  companies: getGroupNames(user.companies.edges),
  teams: getGroupNames(user.teams.edges),
})

const getGroupNames = (groupEdges: Array<MinimumEdge<MinimumGroup>>): string[] =>
  groupEdges.map((edge) => edge.node.name)
