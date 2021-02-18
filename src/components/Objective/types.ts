import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn, KeyResultCheckInStatus } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

export interface Objective {
  id: string
  title: string
  progressIncreaseSinceLastWeek: number
  createdAt: string
  updatedAt: string
  cycle: Cycle
  owner: User
  status: ObjectiveStatus
  keyResults?: KeyResult[]
}

export interface ObjectiveStatus extends KeyResultCheckInStatus {
  latestKeyResultCheckIn?: KeyResultCheckIn
}
