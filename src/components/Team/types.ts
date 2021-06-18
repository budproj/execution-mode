import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'
import { Delta, GraphQLConnection, GraphQLNode, Status } from 'src/components/types'

import { TEAM_GENDER } from './constants'

export interface Team extends GraphQLNode {
  name: string
  isCompany: boolean
  progressIncreaseSinceLastWeek: number
  updatedAt: string
  owner: User
  status: Status
  delta: Delta
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
}
