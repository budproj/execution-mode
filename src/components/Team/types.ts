import { Cycle } from 'src/components/Cycle/types'
import { KeyResult, KeyResultCheckIn } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'

import { TEAM_GENDER } from './constants'

export interface Team {
  id: string
  name: string
  isCompany: boolean
  progress: KeyResultCheckIn['progress']
  confidence: KeyResultCheckIn['confidence']
  progressIncreaseSinceLastWeek: number
  createdAt: string
  updatedAt: string
  owner: User
  description?: string
  gender?: TEAM_GENDER
  company?: Team
  parentTeam?: Team
  users?: User[]
  teams?: Team[]
  teamsRanking?: Team[]
  cycles?: Cycle[]
  objectives?: Objective[]
  keyResults?: KeyResult[]
  latestKeyResultCheckIn?: KeyResultCheckIn
}
