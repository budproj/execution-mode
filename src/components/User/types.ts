import { KeyResult, KeyResultCheckIn, KeyResultCustomList } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

import { USER_GENDER } from './constants'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User {
  id: string
  firstName: string
  fullName: string
  authzSub: string
  createdAt: string
  updatedAt: string
  lastName?: string
  gender?: USER_GENDER
  role?: string
  picture?: string
  nickname?: string
  about?: string
  linkedInProfileAddress?: string
  companies?: Array<Partial<Team>>
  teams?: Array<Partial<Team>>
  ownedTeams?: Array<Partial<Team>>
  objectives?: Objective[]
  keyResults?: KeyResult[]
  keyResultCustomLists?: KeyResultCustomList[]
  keyResultCheckIns?: KeyResultCheckIn[]
}
