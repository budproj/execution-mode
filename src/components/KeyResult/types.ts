import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { GraphQLConnection, GraphQLNode, GraphQLEntityPolicy } from '../types'

import { KEY_RESULT_FORMAT, KEY_RESULT_TYPE } from './constants'

export type KeyResultTimelineEntry = KeyResultCheckIn | KeyResultComment

export interface KeyResultCheckIn extends GraphQLNode {
  __typename: string
  value: number
  valueIncrease: number
  confidence: number
  progress: number
  progressIncrease: number
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
  isOutdated: boolean
  updatedAt: string
  owner: User
  objective: Objective
  team: Team
  policy: GraphQLEntityPolicy
  description?: string
  keyResultCheckIns?: GraphQLConnection<KeyResultCheckIn>
  keyResultComments?: GraphQLConnection<KeyResultComment>
  latestKeyResultCheckIn?: KeyResultCheckIn
  timeline?: GraphQLConnection<KeyResultTimelineEntry>
}

export type KeyResultsHashmap = Record<string, KeyResult>

export interface KeyResultCheckInStatus {
  progress: KeyResultCheckIn['progress']
  confidence: KeyResultCheckIn['confidence']
  createdAt: KeyResultCheckIn['createdAt']
}
