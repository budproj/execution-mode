import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn, KeyResultCheckInStatus } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import { GraphQLConnection, GraphQLEntityPolicy, GraphQLNode } from 'src/components/types'

export interface Objective extends GraphQLNode {
  title: string
  progressIncreaseSinceLastWeek: number
  updatedAt: string
  cycle: Cycle
  owner: User
  status: ObjectiveStatus
  policy: GraphQLEntityPolicy
  keyResults?: GraphQLConnection<KeyResult>
}

export interface ObjectiveStatus extends KeyResultCheckInStatus {
  latestKeyResultCheckIn?: KeyResultCheckIn
}
