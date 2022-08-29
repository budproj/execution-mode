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
  content?: string
  conditional?: ConditionalTypeInfo
  properties?: ValueRangeProperties
  formQuestionIndex: number
  answer?: string | number
  setAnswer?: (questionId: string, questionAnswer: string | number) => void
}
