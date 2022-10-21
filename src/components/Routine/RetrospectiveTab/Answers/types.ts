import { User } from 'src/components/User/types'

export type answerHistory = {
  id?: string
  startDate: Date
  finishDate: Date
}

type answerValue = {
  value: string
  timestamp: string
}

export type routineAnswer = {
  id: string
  heading: string
  type: string
  value?: string
  values?: answerValue[]
  conditional?: {
    dependsOn: string
  }
}

export interface AnswerDetails {
  userId: User['id']
  history: answerHistory[]
  answers: routineAnswer[]
}
