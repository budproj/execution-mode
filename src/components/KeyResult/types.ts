import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { User, UserPolicies } from 'src/components/User/types'

export enum KeyResultFormat {
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  COIN_BRL = 'COIN_BRL',
}

export enum KeyResultViewBinding {
  MINE = 'MINE',
}

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
  binding?: KeyResultViewBinding
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
  format: KeyResultFormat
  createdAt: Date
  updatedAt: Date
  owner: User
  objective: Objective
  team: Team
  progressReports?: ProgressReport[]
  confidenceReports?: ConfidenceReport[]
  policies?: UserPolicies
}

export type KeyResultsHashmap = Record<string, KeyResult>
