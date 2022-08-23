export interface RoutineQuestionProperties {
  question: string
  answer?: string
  index: number
  setAnswer?: (index: number, answer: string) => void
  previousIndexQuestion?: number
}
