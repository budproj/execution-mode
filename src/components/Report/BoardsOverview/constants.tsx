import { Confidence, HealthConfidenceQuantites } from './types'

export const getConfidenceQuantities =
  (quantities: HealthConfidenceQuantites) => (confidence: Confidence) => {
    const number = quantities?.[confidence.name] ?? 0

    return {
      ...confidence,
      quantity: number,
    }
  }

export const getIsListable = (confidence: Confidence): Confidence => {
  const isEmpty = confidence.quantity === 0
  const isListable = !isEmpty

  return {
    ...confidence,
    isListable,
  }
}

export const confidenceTexts: Confidence[] = [
  {
    name: 'achieved',
    color: 'brand.500',
    bg: 'brand.100',
    bgHover: 'brand.100',
  },
  {
    name: 'high',
    color: 'green.500',
    bg: 'green.50',
    bgHover: 'green.50',
  },
  {
    name: 'medium',
    color: 'yellow.600',
    bg: 'yellow.100',
    bgHover: 'yellow.200',
  },
  {
    name: 'low',
    color: 'red.500',
    bg: 'red.50',
    bgHover: 'red.100',
  },
  {
    name: 'barrier',
    color: 'purple.500',
    bg: 'purple.50',
    bgHover: 'purple.100',
  },
  {
    name: 'deprioritized',
    color: 'new-gray.600',
    bg: 'new-gray.100',
    bgHover: 'new-gray.100',
  },
]
