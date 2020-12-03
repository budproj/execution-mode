import { defineMessages, MessageDescriptor } from 'react-intl'
import { selectorFamily } from 'recoil'

import { ConfidenceReport } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::CONFIDENCE_TAG`

type ConfidenceTagMessages =
  | 'upToDate'
  | 'atRisk'
  | 'overdue'
  | 'iconDescUpToDate'
  | 'iconDescAtRisk'
  | 'iconDescOverdue'

export interface Tag {
  message: MessageDescriptor
  desc: MessageDescriptor
  color: string
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

export const messages = defineMessages({
  upToDate: {
    defaultMessage: 'Em dia',
    id: 'J98VQ8',
    description: 'We use this tag to group every key result with confidence higher than 50',
  },

  atRisk: {
    defaultMessage: 'Em risco',
    id: 'AobZDF',
    description:
      'We use this tag to group every key result with confidence higher than 25 but lower than 50',
  },

  overdue: {
    defaultMessage: 'Em atraso',
    id: '8bQS0s',
    description: 'We use this tag to group every key result with confidence lower than 25',
  },

  iconDescUpToDate: {
    defaultMessage: 'Um círculo verde, indicando que o resultado-chave está em dia',
    id: 'LytmoI',
    description: 'A brief explanation for screen readers regarding the green status circle',
  },

  iconDescAtRisk: {
    defaultMessage: 'Um círculo amarelo, indicando que o resultado-chave está em risco',
    id: 'A3RqIa',
    description: 'A brief explanation for screen readers regarding the yellow status circle',
  },

  iconDescOverdue: {
    defaultMessage: 'Um círculo vermelho, indicando que o resultado-chave está atrasada',
    id: 'JuRKh+',
    description: 'A brief explanation for screen readers regarding the red status circle',
  },
}) as Record<ConfidenceTagMessages, MessageDescriptor>

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
      message: messages.upToDate,
      desc: messages.iconDescUpToDate,
      color: 'green.500',
    },
    [CONFIDENCE_AT_RISK.max]: {
      message: messages.atRisk,
      desc: messages.iconDescAtRisk,
      color: 'yellow.500',
    },
    [CONFIDENCE_OUTDATED.max]: {
      message: messages.overdue,
      desc: messages.iconDescOverdue,
      color: 'red.500',
    },
  }

  return confidenceHashmap[normalizedConfidence]
}

export const confidenceTag = selectorFamily<Tag, ConfidenceReport['valueNew'] | undefined>({
  key: KEY,
  get: getConfidenceTagBasedOnValue,
})

export default confidenceTag
