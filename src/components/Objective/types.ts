import { Cycle } from 'src/components/Cycle/types'
import { ConfidenceReport, KeyResult, ProgressReport } from 'src/components/KeyResult/types'

export interface Objective {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  cycle: Cycle
  keyResults?: KeyResult[]
  currentProgress?: ProgressReport['valueNew']
  currentConfidence?: ConfidenceReport['valueNew']
  percentageProgressIncrease?: number
}
