import { useState, Dispatch, SetStateAction } from 'react'
import { useIntl } from 'react-intl'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import messages from './messages'

export interface ConfidenceTag {
  messages: ConfidenceTagMessages
  colors: ConfidenceTagColors
}

export interface ConfidenceTagMessages {
  short: string
  long: string
  icon: string
}

export interface ConfidenceTagColors {
  scheme: string
  primary: string
  light: string
}

export type ConfidenceTagHook = [ConfidenceTag, Dispatch<SetStateAction<number>>]

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

export const useConfidenceTag = (
  initialConfidence: KeyResultCheckIn['confidence'] = CONFIDENCE_HIGH.min,
): ConfidenceTagHook => {
  const [confidence, setConfidence] = useState(initialConfidence)
  const intl = useIntl()

  const normalizedConfidence = normalizeConfidence(confidence)
  const confidenceTagHashmap = {
    [CONFIDENCE_HIGH.max]: {
      messages: {
        short: intl.formatMessage(messages.highShort),
        long: intl.formatMessage(messages.highLong),
        icon: intl.formatMessage(messages.highIcon),
      },
      colors: {
        scheme: 'green',
        primary: 'green.500',
        light: 'green.100',
      },
    },

    [CONFIDENCE_MEDIUM.max]: {
      messages: {
        short: intl.formatMessage(messages.mediumShort),
        long: intl.formatMessage(messages.mediumLong),
        icon: intl.formatMessage(messages.mediumIcon),
      },
      colors: {
        scheme: 'yellow',
        primary: 'yellow.500',
        light: 'yellow.100',
      },
    },

    [CONFIDENCE_LOW.max]: {
      messages: {
        short: intl.formatMessage(messages.lowShort),
        long: intl.formatMessage(messages.lowLong),
        icon: intl.formatMessage(messages.lowIcon),
      },
      colors: {
        scheme: 'red',
        primary: 'red.500',
        light: 'red.100',
      },
    },

    [CONFIDENCE_BARRIER.max]: {
      messages: {
        short: intl.formatMessage(messages.barrierShort),
        long: intl.formatMessage(messages.barrierLong),
        icon: intl.formatMessage(messages.barrierIcon),
      },
      colors: {
        scheme: 'brand',
        primary: 'brand.500',
        light: 'brand.100',
      },
    },
  }

  const confidenceTag = confidenceTagHashmap[normalizedConfidence]

  return [confidenceTag, setConfidence]
}

export default useConfidenceTag
