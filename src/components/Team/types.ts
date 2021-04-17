import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn, KeyResultCheckInStatus } from 'src/components/KeyResult/types'
import { Objective, ObjectiveStatus } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection, GraphQLNode } from 'src/components/types'

import { TEAM_GENDER } from './constants'

export interface Team extends GraphQLNode {
  name: string
  isCompany: boolean
  progressIncreaseSinceLastWeek: number
  updatedAt: string
  owner: User
  status: TeamStatus
  description?: string
  gender?: TEAM_GENDER
  company?: Team
  parent?: Team
  users?: GraphQLConnection<User>
  teams?: GraphQLConnection<Team>
  rankedTeams?: GraphQLConnection<Team>
  cycles?: GraphQLConnection<Cycle>
  objectives?: GraphQLConnection<Objective>
  keyResults?: GraphQLConnection<KeyResult>
  latestKeyResultCheckIn?: KeyResultCheckIn
}

export interface TeamStatus extends KeyResultCheckInStatus {
  latestObjectiveStatus?: ObjectiveStatus
}
