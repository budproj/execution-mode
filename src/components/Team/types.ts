import { Cycle } from 'src/components/Cycle/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'
import { Delta, GraphQLConnection, GraphQLNode, Status } from 'src/components/types'

import { TEAM_GENDER } from './constants'

export interface Team extends GraphQLNode {
  name: string
  isCompany: boolean
  updatedAt: string
  status: Status
  delta: Delta
  owner: User
  description?: string
  gender?: TEAM_GENDER
  company?: Team
  parent?: Team
  tacticalCycle?: Cycle
  users?: GraphQLConnection<User>
  teams?: GraphQLConnection<Team>
  rankedDescendants?: GraphQLConnection<Team>
  cycles?: GraphQLConnection<Cycle>
  objectives?: GraphQLConnection<Objective>
  supportObjectives?: GraphQLConnection<Objective>
  allObjectives?: GraphQLConnection<Objective>
  keyResults?: GraphQLConnection<KeyResult>
}

export interface HealthConfidenceQuantities {
  me: {
    companies: {
      quantities: Quantities
    }
  }
}

export interface Quantities {
  keyResultsQuantity: number
  objectivesQuantity: number
  high: number
  medium: number
  low: number
  barrier: number
}
