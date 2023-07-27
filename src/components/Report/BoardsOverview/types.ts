export interface Confidence {
  name: 'achieved' | 'high' | 'medium' | 'low' | 'barrier' | 'deprioritized'
  color: string
  bg: string
  bgHover: string
  quantity?: number
  isListable?: boolean
}

export interface HealthConfidenceQuantites {
  keyResultsQuantity: number
  objectivesQuantity: number
  high: number
  medium: number
  low: number
  barrier: number
  achieved: number
  deprioritized: number
}
