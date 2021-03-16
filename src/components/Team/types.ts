import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn, KeyResultCheckInStatus } from 'src/components/KeyResult/types'
import { Objective, ObjectiveStatus } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'

import { TEAM_GENDER } from './constants'

export interface Team {
  id: string
  name: string
  isCompany: boolean
  progressIncreaseSinceLastWeek: number
  createdAt: string
  updatedAt: string
  owner: User
  status: TeamStatus
  description?: string
  gender?: TEAM_GENDER
  company?: Team
  parent?: Team
  users?: User[]
  teams?: Team[]
  teamsRanking?: Team[]
  cycles?: Cycle[]
  objectives?: Objective[]
  keyResults?: KeyResult[]
  latestKeyResultCheckIn?: KeyResultCheckIn
}

export interface TeamStatus extends KeyResultCheckInStatus {
  latestObjectiveStatus?: ObjectiveStatus
}
