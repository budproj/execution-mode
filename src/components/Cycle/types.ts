import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection, GraphQLNode } from 'src/components/types'

import { KeyResult } from '../KeyResult/types'

import { CADENCE } from './constants'

export interface Cycle extends GraphQLNode {
  period: string
  cadence: CADENCE
  dateStart: string
  dateEnd: string
  active: boolean
  updatedAt: string
  team: Team
  parent?: Cycle
  cycles?: GraphQLConnection<Cycle>
  objectives?: GraphQLConnection<Objective>
  keyResults?: GraphQLConnection<KeyResult>
}
