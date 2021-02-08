import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { KEY_RESULT_CUSTOM_LIST_BINDING } from 'src/components/User/constants'
import { User } from 'src/components/User/types'
import { AuthzPolicies } from 'src/state/recoil/authz/policies/types'

import { KEY_RESULT_FORMAT } from './constants'

export interface KeyResultCheckIn {
  __typename: string
  id: string
  progress: number
  confidence: number
  relativePercentageProgress: number
  createdAt: string
  keyResult: KeyResult
  keyResultId: KeyResult['id']
  user: User
  comment?: string
  parent?: KeyResultCheckIn
}

export interface KeyResultComment {
  __typename: string
  id: string
  text: string
  createdAt: string
  updatedAt: string
  user: User
  keyResult: KeyResult
  keyResultId: KeyResult['id']
}

export interface KeyResultCustomList {
  id: string
  createdAt: string
  updatedAt: string
  user: User
  title?: string
  binding?: KEY_RESULT_CUSTOM_LIST_BINDING
  rank?: Array<KeyResult['id']>
  keyResults?: KeyResult[]
}

export interface KeyResult {
  id: string
  title: string
  initialValue: number
  goal: number
  format: KEY_RESULT_FORMAT
  currentProgress: KeyResultCheckIn['progress']
  currentConfidence: KeyResultCheckIn['confidence']
  createdAt: string
  updatedAt: string
  owner: User
  objective: Objective
  team: Team
  policies: AuthzPolicies
  description?: string
  keyResultCheckIns?: KeyResultCheckIn[]
  timeline: Array<KeyResultCheckIn | KeyResultComment>
}

export type KeyResultsHashmap = Record<string, KeyResult>
