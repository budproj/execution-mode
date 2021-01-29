import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { KEY_RESULT_CUSTOM_LIST_BINDING } from 'src/components/User/constants'
import { User, UserPolicies } from 'src/components/User/types'

import { KEY_RESULT_FORMAT } from './constants'

export interface KeyResultCheckIn {
  id: string
  progress: number
  confidence: number
  relativePercentageProgress: number
  createdAt: string
  keyResult: KeyResult
  user: User
  comment?: string
  parent?: KeyResultCheckIn
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
  policies: UserPolicies
  description?: string
  keyResultCheckIns?: KeyResultCheckIn[]
}

export type KeyResultsHashmap = Record<string, KeyResult>
