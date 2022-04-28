import { Confidence, HealthConfidenceQuantites } from './types'

export const getConfidenceQuantities =
  (quantities: HealthConfidenceQuantites) => (confidence: Confidence) => {
    const number = quantities?.[confidence.name] ?? 0

    return {
      ...confidence,
      quantity: number,
    }
  }

export const confidenceTexts: Confidence[] = [
  {
    name: 'highConfidence',
    color: 'green.500',
    bg: 'green.50',
  },
  {
    name: 'mediumConfidence',
    color: 'yellow.600',
    bg: 'yellow.100',
  },
  {
    name: 'lowConfidence',
    color: 'red.500',
    bg: 'red.50',
  },
  {
    name: 'barrier',
    color: 'purple.500',
    bg: 'purple.50',
  },
]
