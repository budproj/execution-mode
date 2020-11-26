import { Team } from 'components/Company/types'
import { Objective } from 'components/Objective/types'
import { User } from 'components/User/types'

export enum KeyResultFormat {
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  COIN_BRL = 'COIN_BRL',
}

export enum KeyResultViewBinding {
  MINE = 'MINE',
}

export interface ConfidenceReport {
  valuePrevious?: number
  valueNew: number
  comment?: string
  createdAt: Date
  user: User
  keyResult: KeyResult
}

export interface ProgressReport {
  valuePrevious?: number
  valueNew: number
  comment?: string
  createdAt: Date
  user: User
  keyResult: KeyResult
}

export interface KeyResultView {
  id: number
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
}

export type KeyResultsHashmap = Record<string, KeyResult>
