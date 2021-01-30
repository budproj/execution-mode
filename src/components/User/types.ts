import { KeyResult, KeyResultCheckIn, KeyResultCustomList } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

import { USER_GENDER, USER_POLICY } from './constants'

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
  companies?: Team[]
  teams?: Team[]
  ownedTeams?: Team[]
  objectives?: Objective[]
  keyResults?: KeyResult[]
  keyResultCustomLists?: KeyResultCustomList[]
  keyResultCheckIns?: KeyResultCheckIn[]
}

export interface UserPolicies {
  create: USER_POLICY
  read: USER_POLICY
  update: USER_POLICY
  delete: USER_POLICY
}
