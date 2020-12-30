import { Cycle } from 'src/components/Cycle/types'
import { ConfidenceReport, ProgressReport } from 'src/components/KeyResult/types'
import { Team } from 'src/components/Team/types'

import { User } from '../User/types'

import { COMPANY_GENDER } from './constants'

export interface Company {
  id: string
  name: string
  gender?: COMPANY_GENDER
  description?: string
  currentProgress?: number
  currentConfidence?: number
  createdAt: Date
  updatedAt: Date
  teams?: Team[]
  cycles?: Cycle[]
  users?: User[]
  latestReport?: ProgressReport | ConfidenceReport
  percentageProgressIncrease?: number
}
