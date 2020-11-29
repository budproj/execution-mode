import { Team } from 'src/components/Company/types'
import { KeyResult, ProgressReport, ConfidenceReport } from 'src/components/KeyResult/types'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User {
  id: string
  authzSub: string
  name: string
  role?: string
  picture?: string
  createdAt: Date
  updatedAt: Date
  keyResults?: KeyResult[]
  progressReports?: ProgressReport[]
  confidenceReport?: ConfidenceReport[]
  teams?: Team[]
}
