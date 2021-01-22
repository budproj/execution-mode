import { Cycle } from 'src/components/Cycle/types'
import { ConfidenceReport, KeyResult, ProgressReport } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'

import { TEAM_GENDER } from './constants'

export interface Team {
  id: string
  name: string
  description?: string
  gender?: TEAM_GENDER
  currentProgress?: number
  currentConfidence?: number
  createdAt: string
  updatedAt: string
  keyResults?: KeyResult[]
  users?: User[]
  teams?: Team[]
  objectives?: Objective[]
  cycles?: Cycle[]
  latestReport?: ProgressReport | ConfidenceReport
  percentageProgressIncrease?: number
  isCompany?: boolean
}
