import { CompanyCycle, CompanyTeam } from 'components/Company'
import { Objective } from 'components/Objective'
import { User } from 'components/User'

export interface KeyResultConfidence {
  value: number
  user: User
  createdAt: Date
}

export interface KeyResult {
  id: string
  title: string
  progress: number
  confidence: KeyResultConfidence
  team: CompanyTeam
  cycle: CompanyCycle
  objective: Objective
  owner: User
}

export type KeyResultsHashmap = Record<string, KeyResult>
