import { MessageDescriptor } from 'react-intl'
import { selectorFamily } from 'recoil'

import { PREFIX } from './constants'
import { confidenceTagMessages } from './messages'

const KEY = `${PREFIX}::CONFIDENCE_TAG`

export interface Tag {
  message: MessageDescriptor
  desc: MessageDescriptor
  color: string
  bgColor: string
}

export const CONFIDENCE_HIGH = {
  max: 100,
  min: 67,
}
export const CONFIDENCE_MEDIUM = {
  max: 66,
  min: 33,
}
export const CONFIDENCE_LOW = {
  max: 32,
  min: 0,
}

export const CONFIDENCE_BARRIER = {
  max: -1,
}

export const normalizeConfidence = (
  value?: KeyResultCheckIn['confidence'],
): KeyResultCheckIn['confidence'] => {
  const defaultConfidence = CONFIDENCE_HIGH.max

  if (!value && value !== 0) return defaultConfidence

  if (value >= CONFIDENCE_HIGH.min) return CONFIDENCE_HIGH.max
  if (value >= CONFIDENCE_MEDIUM.min && value <= CONFIDENCE_MEDIUM.max) return CONFIDENCE_MEDIUM.max
  if (value >= CONFIDENCE_LOW.min && value <= CONFIDENCE_LOW.max) return CONFIDENCE_LOW.max
  if (value <= CONFIDENCE_BARRIER.max) return CONFIDENCE_BARRIER.max

  return defaultConfidence
}

export const getConfidenceTagBasedOnValue = (
  value: KeyResultCheckIn['confidence'] = CONFIDENCE_HIGH.min,
) => (): Tag => {
  const normalizedConfidence = normalizeConfidence(value)
  const confidenceHashmap = {
    [CONFIDENCE_HIGH.max]: {
      message: confidenceTagMessages.high,
      desc: confidenceTagMessages.iconDescHigh,
      color: 'green.500',
      bgColor: 'green.100',
    },

    [CONFIDENCE_MEDIUM.max]: {
      message: confidenceTagMessages.medium,
      desc: confidenceTagMessages.iconDescMedium,
      color: 'yellow.500',
      bgColor: 'yellow.100',
    },

    [CONFIDENCE_LOW.max]: {
      message: confidenceTagMessages.low,
      desc: confidenceTagMessages.iconDescLow,
      color: 'red.500',
      bgColor: 'red.100',
    },

    [CONFIDENCE_BARRIER.max]: {
      message: confidenceTagMessages.barrier,
      desc: confidenceTagMessages.iconDescBarrier,
      color: 'brand.500',
      bgColor: 'brand.100',
    },
  }

  return confidenceHashmap[normalizedConfidence]
}

export const confidenceTag = selectorFamily<Tag, KeyResultCheckIn['confidence'] | undefined>({
  key: KEY,
  get: getConfidenceTagBasedOnValue,
})

export default confidenceTag
