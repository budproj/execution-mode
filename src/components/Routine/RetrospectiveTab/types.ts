import { Team } from 'src/components/Team/types'
import { User } from 'src/components/User/types'

export type AnswerType = {
  id: string
  user: string
  feeling: number
  createdAt: string
  comments: number
}

export type answerHistory = {
  id?: string
  startDate: string
  finishDate: string
}

type answerValue = {
  value: string
  timestamp: string
}

export type routineAnswer = {
  length: number
  id: string
  heading: string
  type: string
  value?: string
  values?: answerValue[]
  conditional?: {
    dependsOn: string
  }
  dependsThat?: routineAnswer
  userThatAnswered: User
}

export interface AnswerDetails {
  user: Partial<User>
  history: answerHistory[]
  answers: routineAnswer[]
}

export interface RetrospectiveTabContent {
  teamId: Team['id']
  answerQuery: string
}

export interface AnswerSummary {
  id?: string
  userId: string
  name: string
  picture?: string
  latestStatusReply?: string
  timestamp?: Date
  commentCount?: number
}

export interface AverageData {
  timestamp: string
  average: number
  total?: number
}

export interface OverviewData {
  overview?: {
    feeling: AverageData[]
    productivity: AverageData[]
    roadblock: AverageData[]
  }
}
