import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'

import { UserPolicy } from './constants'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User {
  id: string
  authzSub: string
  name: string
  gender?: UserGender
  role?: string
  picture?: string
  createdAt: Date
  updatedAt: Date
  keyResults?: KeyResult[]
  progressReports?: ProgressReport[]
  confidenceReport?: ConfidenceReport[]
  teams?: Team[]
}

export interface UserPolicies {
  create: UserPolicy
  read: UserPolicy
  update: UserPolicy
  delete: UserPolicy
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
