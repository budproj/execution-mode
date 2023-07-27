import { useState, Dispatch, SetStateAction } from 'react'
import { IntlShape, useIntl } from 'react-intl'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import messages from './messages'

export interface ConfidenceTag {
  messages: ConfidenceTagMessages
  tag: string
  color: ConfidenceTagColor
}

export interface ConfidenceTagMessages {
  short: string
  long: string
  icon: string
  helper: string
}

interface ConfidenceTagColorVariant {
  primary: string
  light: string
}

export interface ConfidenceTagColor extends ConfidenceTagColorVariant {
  scheme: string
  variants: {
    sharp: ConfidenceTagColorVariant
  }
}

export type ConfidenceTagHook = [ConfidenceTag, Dispatch<SetStateAction<number>>]

export const CONFIDENCE_ACHIEVED = {
  max: 200,
  min: 101,
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
  min: -1,
}

export const CONFIDENCE_DEPRIORITIZED = {
  max: 0,
  min: -100,
}

export const normalizeConfidence = (
  value?: KeyResultCheckIn['confidence'],
): KeyResultCheckIn['confidence'] => {
  const defaultConfidence = CONFIDENCE_HIGH.max

  if (!value && value !== 0) return defaultConfidence

  if (value >= CONFIDENCE_ACHIEVED.min) return CONFIDENCE_ACHIEVED.max
  if (value >= CONFIDENCE_HIGH.min && value <= CONFIDENCE_HIGH.max) return CONFIDENCE_HIGH.max
  if (value >= CONFIDENCE_MEDIUM.min && value <= CONFIDENCE_MEDIUM.max) return CONFIDENCE_MEDIUM.max
  if (value >= CONFIDENCE_LOW.min && value <= CONFIDENCE_LOW.max) return CONFIDENCE_LOW.max
  if (value === CONFIDENCE_BARRIER.max) return CONFIDENCE_BARRIER.max
  if (value <= CONFIDENCE_DEPRIORITIZED.max) return CONFIDENCE_DEPRIORITIZED.min

  return defaultConfidence
}

export const getConfidenceName = (
  value: KeyResultCheckIn['confidence'],
  intl: IntlShape,
): string => {
  const confidenceObject = getConfidenceObject(intl)
  const normalizedConfidence = normalizeConfidence(value)
  return confidenceObject[normalizedConfidence].messages.long
}

const getConfidenceObject = (intl: IntlShape) => {
  return {
    [CONFIDENCE_ACHIEVED.max]: {
      messages: {
        short: intl.formatMessage(messages.achievedShort),
        long: intl.formatMessage(messages.achievedLong),
        icon: intl.formatMessage(messages.achievedIcon),
        helper: intl.formatMessage(messages.achievedHelperText),
      },
      tag: 'CONFIDENCE_ACHIEVED',
      color: {
        scheme: 'brand',
        primary: 'brand.500',
        light: 'brand.100',
        variants: {
          sharp: {
            primary: 'brand.600',
            light: 'brand.500',
          },
        },
      },
    },
    [CONFIDENCE_HIGH.max]: {
      messages: {
        short: intl.formatMessage(messages.highShort),
        long: intl.formatMessage(messages.highLong),
        icon: intl.formatMessage(messages.highIcon),
        helper: intl.formatMessage(messages.highHelperText),
      },
      tag: 'CONFIDENCE_HIGH',
      color: {
        scheme: 'green',
        primary: 'green.500',
        light: 'green.50',
        variants: {
          sharp: {
            primary: 'green.500',
            light: 'green.100',
          },
        },
      },
    },

    [CONFIDENCE_MEDIUM.max]: {
      messages: {
        short: intl.formatMessage(messages.mediumShort),
        long: intl.formatMessage(messages.mediumLong),
        icon: intl.formatMessage(messages.mediumIcon),
        helper: intl.formatMessage(messages.mediumHelperText),
      },
      tag: 'CONFIDENCE_MEDIUM',
      color: {
        scheme: 'yellow',
        primary: 'yellow.600',
        light: 'yellow.100',
        variants: {
          sharp: {
            primary: 'yellow.600',
            light: 'yellow.200',
          },
        },
      },
    },

    [CONFIDENCE_LOW.max]: {
      messages: {
        short: intl.formatMessage(messages.lowShort),
        long: intl.formatMessage(messages.lowLong),
        icon: intl.formatMessage(messages.lowIcon),
        helper: intl.formatMessage(messages.lowHelperText),
      },
      tag: 'CONFIDENCE_LOW',
      color: {
        scheme: 'red',
        primary: 'red.500',
        light: 'red.50',
        variants: {
          sharp: {
            primary: 'red.500',
            light: 'red.100',
          },
        },
      },
    },

    [CONFIDENCE_BARRIER.max]: {
      messages: {
        short: intl.formatMessage(messages.barrierShort),
        long: intl.formatMessage(messages.barrierLong),
        icon: intl.formatMessage(messages.barrierIcon),
        helper: intl.formatMessage(messages.barrierHelperText),
      },
      tag: 'CONFIDENCE_BARRIER',
      color: {
        scheme: 'purple',
        primary: 'purple.500',
        light: 'purple.50',
        variants: {
          sharp: {
            primary: 'purple.500',
            light: 'purple.100',
          },
        },
      },
    },
    [CONFIDENCE_DEPRIORITIZED.min]: {
      messages: {
        short: intl.formatMessage(messages.deprioritizedShort),
        long: intl.formatMessage(messages.deprioritizedLong),
        icon: intl.formatMessage(messages.deprioritizedIcon),
        helper: intl.formatMessage(messages.deprioritizedHelperText),
      },
      tag: 'CONFIDENCE_DEPRIORITIZED',
      color: {
        scheme: 'new-gray',
        primary: 'new-gray.600',
        light: 'new-gray.100',
        variants: {
          sharp: {
            primary: 'new-gray.600',
            light: 'new-gray.100',
          },
        },
      },
    },
  }
}

export const useConfidenceTag = (
  initialConfidence: KeyResultCheckIn['confidence'] = CONFIDENCE_HIGH.min,
): ConfidenceTagHook => {
  const [confidence, setConfidence] = useState(initialConfidence)
  const intl = useIntl()

  const normalizedConfidence = normalizeConfidence(confidence)
  const confidenceTagHashmap = getConfidenceObject(intl)

  const confidenceTag = confidenceTagHashmap[normalizedConfidence]

  return [confidenceTag, setConfidence]
}

export default useConfidenceTag
