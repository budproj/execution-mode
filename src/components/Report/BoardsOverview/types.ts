export interface Confidence {
  name: 'high' | 'medium' | 'low' | 'barrier'
  color: string
  bg: string
}

export interface HealthConfidenceQuantites {
  keyResultsQuantity: number
  objectivesQuantity: number
  high: number
  medium: number
  low: number
  barrier: number
}
