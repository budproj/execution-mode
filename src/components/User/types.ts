import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'
import { GraphQLConnection, GraphQLNode } from 'src/components/types'

import { USER_GENDER } from './constants'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const AuthzUserRoles = {
  teamMember: 'Team Member',
  leader: 'Leader',
  squadMember: 'Squad Member',
  admin: 'Company Admin',
}
export interface AuthzRole {
  id: string
  name: string
  description?: string
}

export type keyResultsProgress = {
  progress: number
  delta: {
    progress: number
    confidence: number
  }
  latestCheckIn: {
    createdAt: string
  }
}

export type userIndicators = {
  keyResultsProgress: keyResultsProgress
  keyResultsCheckInProgress: {
    checked: number
    total: number
  }
  keyResultsCheckListProgress: {
    checked: number
    total: number
  }
}

type retrospectiveAnswer = {
  questionId: string
  answerGroupId: string
  value: string
}

export type lastRetrospectiveAnswer = {
  id: string
  userId: string
  answers: retrospectiveAnswer[]
}
export interface User extends GraphQLNode {
  firstName: string
  fullName: string
  email: string
  authzSub: string
  updatedAt: string
  lastName?: string
  gender?: USER_GENDER
  role?: string
  authzRole?: AuthzRole
  picture?: string
  status?: UserStatus
  nickname?: string
  about?: string
  amplitude?: UserAmplitudeData
  linkedInProfileAddress?: string
  yearlyProgress?: UserProgress
  quarterlyProgress?: UserProgress
  companies?: GraphQLConnection<Team>
  teams?: GraphQLConnection<Team>
  ownedTeams?: GraphQLConnection<Team>
  objectives?: GraphQLConnection<Objective>
  keyResults?: GraphQLConnection<KeyResult>
  keyResultCheckIns?: GraphQLConnection<KeyResult>
  userIndicators?: userIndicators
  lastRoutine?: lastRetrospectiveAnswer
}

export interface UserProgress {
  showProgress: boolean
  progress: number
}

export interface UserAmplitudeData {
  last_used?: string
}

export interface UserQuery {
  user: User
}

export interface UserMeQuery {
  me: User
}
