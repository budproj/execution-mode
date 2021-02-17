import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

export interface Objective {
  id: string
  title: string
  progress: KeyResultCheckIn['progress']
  confidence: KeyResultCheckIn['confidence']
  progressIncreaseSinceLastWeek: number
  createdAt: string
  updatedAt: string
  cycle: Cycle
  owner: User
  keyResults?: KeyResult[]
}
