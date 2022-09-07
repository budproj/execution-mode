export interface RoutineQuestionProperties {
  question: string
  answer?: string
  previousIndexQuestion?: number
}
interface ConditionalTypeInfo {
  dependsOn: string
  type: string
  roadblock?: boolean
  value_range?: number
}

export type FormAnswerFormats = number | string | boolean
interface ValueRangeProperties {
  steps: number
  labels: {
    left: string
    center: string
    right: string
  }
}

export interface FormQuestion {
  id: string
  type: string
  heading: string
  hidden: boolean
  content?: string
  conditional?: ConditionalTypeInfo
  properties?: ValueRangeProperties
  formQuestionIndex: number
  answer?: FormAnswerFormats
  setAnswer?: (questionId: string, questionAnswer: FormAnswerFormats) => void
}
