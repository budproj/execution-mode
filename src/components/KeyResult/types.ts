import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

import { GraphQLConnection, GraphQLNode, GraphQLEntityPolicy, Delta, Status } from '../types'

import {
  AUTHOR_TYPE,
  COMMENT_TYPE,
  KEY_RESULT_FORMAT,
  KEY_RESULT_MODE,
  KEY_RESULT_PATCHS_KEYS,
  KEY_RESULT_TYPE,
} from './constants'

export type KeyResultTimelineEntry = KeyResultCheckIn | KeyResultComment | KeyResultUpdates

export type Author = {
  type: AUTHOR_TYPE
  identifier: string
}

export interface KeyResultPatchInterface {
  key: KEY_RESULT_PATCHS_KEYS
  value: any
}

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
  type: COMMENT_TYPE
  extra: any
  parentId: string
  updatedAt: string
  user: User
  keyResult: KeyResult
  keyResultId: KeyResult['id']
}

export interface KeyResultUpdates extends GraphQLNode {
  __typename: string
  keyResultId: string
  author: Author
  oldState: KeyResultStateInterface
  patches: KeyResultPatchInterface[]
  newState: KeyResultStateInterface
}

export interface KeyResultStateInterface {
  mode: KEY_RESULT_MODE
  title: string
  goal: number
  format: KEY_RESULT_FORMAT
  type: KEY_RESULT_TYPE
  ownerId: string
  description: string
  author?: Author
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
  mode: KEY_RESULT_MODE
  objective: Objective
  team: Team
  teamId?: Team['id']
  policy: GraphQLEntityPolicy
  description?: string
  supportTeamMembers?: GraphQLConnection<User>
  keyResultCheckIns: GraphQLConnection<KeyResultCheckIn>
  keyResultComments: GraphQLConnection<KeyResultComment>
  timeline?: GraphQLConnection<KeyResultTimelineEntry>
  checkList: KeyResultChecklist
}

interface KeyResultCheckInDelta extends Delta {
  value: number
}

export interface KeyResultCheckMark extends GraphQLNode {
  description: string
  state: KeyResultCheckMarkState
  updatedAt: string
  keyResultId: string
  userId: string
  assignedUserId: string
  assignedUser: User
}

export enum KeyResultCheckMarkState {
  CHECKED = 'checked',
  UNCHECKED = 'unchecked',
}

export interface KeyResultChecklist extends GraphQLConnection<KeyResultCheckMark> {
  progress: KeyResultChecklistProgress
}

export interface KeyResultChecklistProgress {
  total: number
  numberOfChecked: number
  progress: number
}

export interface KeyResultProgressRecord extends GraphQLNode {
  progress: number
  date: Date
}
