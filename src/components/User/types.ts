import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'

import { USER_GENDER, USER_POLICY } from './constants'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User {
  id: string
  authzSub: string
  firstName: string
  lastName?: string
  fullName: string
  gender?: USER_GENDER
  role?: string
  picture?: string
  createdAt: string
  updatedAt: string
  keyResults?: KeyResult[]
  progressReports?: ProgressReport[]
  confidenceReport?: ConfidenceReport[]
  teams?: Team[]
  companies?: Team[]
}

export interface UserPolicies {
  create: USER_POLICY
  read: USER_POLICY
  update: USER_POLICY
  delete: USER_POLICY
}
