import { MessageDescriptor } from 'react-intl'
import { selectorFamily } from 'recoil'

import { ConfidenceReport } from 'src/components/KeyResult/types'

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
  min: 50,
}
export const CONFIDENCE_MEDIUM = {
  max: 49,
  min: 25,
}
export const CONFIDENCE_LOW = {
  max: 24,
  min: 0,
}

export const normalizeConfidence = (
  value?: ConfidenceReport['valueNew'],
): ConfidenceReport['valueNew'] => {
  if (!value && value !== 0) return CONFIDENCE_HIGH.max

  if (value >= CONFIDENCE_HIGH.min) return CONFIDENCE_HIGH.max

  if (value >= CONFIDENCE_MEDIUM.min && value < CONFIDENCE_HIGH.min) return CONFIDENCE_MEDIUM.max

  return CONFIDENCE_LOW.max
}

export const getConfidenceTagBasedOnValue = (
  value: ConfidenceReport['valueNew'] = CONFIDENCE_HIGH.min,
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
  }

  return confidenceHashmap[normalizedConfidence]
}

export const confidenceTag = selectorFamily<Tag, ConfidenceReport['valueNew'] | undefined>({
  key: KEY,
  get: getConfidenceTagBasedOnValue,
})

export default confidenceTag
