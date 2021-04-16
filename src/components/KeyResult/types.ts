import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'

import { GraphQLNode } from '../types'

import { KEY_RESULT_FORMAT } from './constants'

export type KeyResultTimelineEntry = KeyResultCheckIn | KeyResultComment

export interface KeyResultCheckIn extends GraphQLNode {
  __typename: string
  value: number
  valueIncrease: number
  confidence: number
  progress: number
  progressIncrease: number
  policies: AuthzPolicies
  keyResult: KeyResult
  keyResultId: KeyResult['id']
  user: User
  comment?: string
  parent?: KeyResultCheckIn
}

export interface KeyResultComment extends GraphQLNode {
  __typename: string
  text: string
  policies: AuthzPolicies
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
  isOutdated: boolean
  updatedAt: string
  owner: User
  objective: Objective
  team: Team
  policies: AuthzPolicies
  description?: string
  keyResultCheckIns?: KeyResultCheckIn[]
  latestKeyResultCheckIn?: KeyResultCheckIn
  timeline: KeyResultTimelineEntry[]
}

export type KeyResultsHashmap = Record<string, KeyResult>

export interface KeyResultCheckInStatus {
  progress: KeyResultCheckIn['progress']
  confidence: KeyResultCheckIn['confidence']
  createdAt: KeyResultCheckIn['createdAt']
}
