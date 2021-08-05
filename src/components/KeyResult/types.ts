import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { GraphQLConnection, GraphQLNode, GraphQLEntityPolicy, Delta, Status } from '../types'

import { KEY_RESULT_FORMAT, KEY_RESULT_TYPE } from './constants'

export type KeyResultTimelineEntry = KeyResultCheckIn | KeyResultComment

export interface KeyResultCheckIn extends GraphQLNode {
  __typename: string
  value: number
  valueIncrease: number
  confidence: number
  progress: number
  delta: KeyResultCheckInDelta
  policy: GraphQLEntityPolicy
  keyResult: KeyResult
  keyResultId: KeyResult['id']
  user: User
  comment?: string
  parent?: KeyResultCheckIn
}

export interface KeyResultComment extends GraphQLNode {
  __typename: string
  text: string
  policy: GraphQLEntityPolicy
  updatedAt: string
  user: User
  keyResult: KeyResult
  keyResultId: KeyResult['id']
}

export interface KeyResult extends GraphQLNode {
  title: string
  initialValue: number
  goal: number
  format: KEY_RESULT_FORMAT
  type: KEY_RESULT_TYPE
  updatedAt: string
  status: Status
  delta: Delta
  owner: User
  objective: Objective
  team: Team
  policy: GraphQLEntityPolicy
  description?: string
  keyResultCheckIns?: GraphQLConnection<KeyResultCheckIn>
  keyResultComments?: GraphQLConnection<KeyResultComment>
  timeline?: GraphQLConnection<KeyResultTimelineEntry>
  checkList: KeyResultChecklist
}

interface KeyResultCheckInDelta extends Delta {
  value: number
}

interface KeyResultCheckMark extends GraphQLNode {
  description: string
  state: KeyResultCheckMarkState
  updatedAt: string
  keyResultId: string
  userId: string
}

enum KeyResultCheckMarkState {
  CHECKED = 'checked',
  UNCHECKED = 'unchecked',
}

interface KeyResultChecklist extends GraphQLConnection<KeyResultCheckMark> {
  progress: KeyResultChecklistProgress
}

interface KeyResultChecklistProgress {
  total: number
  numberOfChecked: number
  progress: number
}
