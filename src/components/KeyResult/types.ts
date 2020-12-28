import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { KEY_RESULT_VIEW_BINDING } from 'src/components/User/constants'
import { User, UserPolicies } from 'src/components/User/types'

import { KEY_RESULT_FORMAT } from './constants'

export interface ConfidenceReport {
  id: string
  valuePrevious?: number
  valueNew: number
  comment?: string
  createdAt: Date
  user: User
  keyResult: KeyResult
}

export interface ProgressReport {
  id: string
  valuePrevious?: number
  valueNew: number
  comment?: string
  createdAt: Date
  user: User
  keyResult: KeyResult
}

export interface KeyResultView {
  id: string
  title?: string
  binding?: KEY_RESULT_VIEW_BINDING
  rank: Array<KeyResult['id']>
  keyResults: KeyResult[]
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface KeyResult {
  id: string
  title: string
  description?: string
  initialValue: number
  goal: number
  format: KEY_RESULT_FORMAT
  createdAt: Date
  updatedAt: Date
  owner: User
  objective: Objective
  team: Team
  progressReports?: ProgressReport[]
  confidenceReports?: ConfidenceReport[]
  policies?: UserPolicies
  currentProgress?: ProgressReport['valueNew']
  currentConfidence?: ConfidenceReport['valueNew']
}

export type KeyResultsHashmap = Record<string, KeyResult>
