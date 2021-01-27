import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

export interface Objective {
  id: string
  title: string
  currentProgress: KeyResultCheckIn['progress']
  currentConfidence: KeyResultCheckIn['confidence']
  percentageProgressIncrease: number
  createdAt: string
  updatedAt: string
  cycle: Cycle
  owner: User
  keyResults?: KeyResult[]
}
