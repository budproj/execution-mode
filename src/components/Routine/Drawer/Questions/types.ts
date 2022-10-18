export interface RoutineQuestionProperties {
  question: string
  answer?: string
  previousIndexQuestion?: number
}
interface ConditionalTypeInfo {
  dependsOn: string
  type: string
  road_block?: boolean
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
  required?: boolean
  hidden: boolean
  content?: string
  conditional?: ConditionalTypeInfo
  properties?: ValueRangeProperties
  formQuestionIndex: number
  answer?: string
  setAnswer?: (questionId: string, value: string, hidden?: boolean) => void
}
