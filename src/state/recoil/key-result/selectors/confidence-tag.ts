import { defineMessages, MessageDescriptor } from 'react-intl'
import { selectorFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult'
import currentConfidenceSelector from 'src/state/recoil/key-result/progress-update/current-confidence'
import { RecoilSpecificationGetter } from 'src/state/recoil/types'

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

export const getConfidenceTagBasedOnID = (id?: KeyResult['id']) => ({
  get,
}: RecoilSpecificationGetter): Tag => {
  const currentConfidence = get(currentConfidenceSelector(id)) ?? 50

  if (currentConfidence >= 50)
    return {
      message: messages.upToDate,
      desc: messages.iconDescUpToDate,
      color: 'green.500',
    }
  if (currentConfidence >= 25 && currentConfidence < 50)
    return {
      message: messages.atRisk,
      desc: messages.iconDescAtRisk,
      color: 'yellow.500',
    }
  return {
    message: messages.overdue,
    desc: messages.iconDescOverdue,
    color: 'red.500',
  }
}

export const confidenceTag = selectorFamily<Tag, KeyResult['id'] | undefined>({
  key: KEY,
  get: getConfidenceTagBasedOnID,
})

export default confidenceTag
