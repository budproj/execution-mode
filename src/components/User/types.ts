import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection, GraphQLNode } from 'src/components/types'

import { USER_GENDER } from './constants'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User extends GraphQLNode {
  firstName: string
  fullName: string
  authzSub: string
  updatedAt: string
  lastName?: string
  gender?: USER_GENDER
  role?: string
  picture?: string
  nickname?: string
  about?: string
  linkedInProfileAddress?: string
  companies?: GraphQLConnection<Team>
  teams?: GraphQLConnection<Team>
  ownedTeams?: GraphQLConnection<Team>
  objectives?: GraphQLConnection<Objective>
  keyResults?: GraphQLConnection<KeyResult>
  keyResultCheckIns?: GraphQLConnection<KeyResult>
}
