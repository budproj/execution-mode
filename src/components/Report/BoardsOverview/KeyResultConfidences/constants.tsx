export interface Confidence {
  name: 'highConfidence' | 'mediumConfidence' | 'lowConfidence' | 'barrier'
  color: string
  bg: string
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
