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

export const CONFIDENCE_UPDATED = {
  max: 100,
  min: 50,
}
export const CONFIDENCE_AT_RISK = {
  max: 49,
  min: 25,
}
export const CONFIDENCE_OUTDATED = {
  max: 24,
  min: 0,
}

export const normalizeConfidence = (
  value?: ConfidenceReport['valueNew'],
): ConfidenceReport['valueNew'] => {
  if (!value) return CONFIDENCE_UPDATED.max

  if (value >= CONFIDENCE_UPDATED.min) return CONFIDENCE_UPDATED.max

  if (value >= CONFIDENCE_AT_RISK.min && value < CONFIDENCE_UPDATED.min)
    return CONFIDENCE_AT_RISK.max

  return CONFIDENCE_OUTDATED.max
}

export const getConfidenceTagBasedOnValue = (
  value: ConfidenceReport['valueNew'] = CONFIDENCE_UPDATED.min,
) => (): Tag => {
  const normalizedConfidence = normalizeConfidence(value)
  const confidenceHashmap = {
    [CONFIDENCE_UPDATED.max]: {
      message: confidenceTagMessages.high,
      desc: confidenceTagMessages.iconDescHigh,
      color: 'green.500',
      bgColor: 'green.100',
    },
    [CONFIDENCE_AT_RISK.max]: {
      message: confidenceTagMessages.medium,
      desc: confidenceTagMessages.iconDescMedium,
      color: 'yellow.500',
      bgColor: 'yellow.100',
    },
    [CONFIDENCE_OUTDATED.max]: {
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
