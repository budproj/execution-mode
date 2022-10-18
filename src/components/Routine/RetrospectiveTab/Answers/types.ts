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
  history: answerHistory[]
  answers: routineAnswer[]
}
