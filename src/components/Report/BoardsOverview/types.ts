export interface Confidence {
  name: 'highConfidence' | 'mediumConfidence' | 'lowConfidence' | 'barrier'
  color: string
  bg: string
}

export interface HealthConfidenceQuantites {
  keyResultsQuantity: number
  objectivesQuantity: number
  highConfidence: number
  mediumConfidence: number
  lowConfidence: number
  barrier: number
}
