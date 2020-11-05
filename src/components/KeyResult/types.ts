import { Objective } from 'components/Objective'
import { User } from 'components/User'

export type KeyResultDrawing = string

export interface KeyResultIcon {
  drawing: KeyResultDrawing
  backgroundColor: string
}

export interface KeyResult {
  id: string
  title: string
  team: string
  confidence: number
  progress: number
  startDate: Date
  endDate: Date
  icon: KeyResultIcon
  objective: Objective
  owner: User
}

export type KeyResultsHashmap = Record<string, KeyResult>
