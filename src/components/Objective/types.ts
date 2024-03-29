import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import {
  Delta,
  GraphQLConnection,
  GraphQLEntityPolicy,
  GraphQLNode,
  Status,
} from 'src/components/types'

import { Team } from '../Team/types'

export enum ObjectiveMode {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}

export interface Objective extends GraphQLNode {
  title: string
  description: string
  updatedAt: string
  status: Status
  delta: Delta
  cycle: Cycle
  owner: User
  ownerId?: string
  policy: GraphQLEntityPolicy
  teamId?: string
  team?: Team
  mode: ObjectiveMode
  supportTeams?: GraphQLConnection<Team>
  keyResults?: GraphQLConnection<KeyResult>
}
