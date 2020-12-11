import { defineMessages, MessageDescriptor } from 'react-intl'

type ConfidenceTagMessages =
  | 'upToDate'
  | 'atRisk'
  | 'overdue'
  | 'iconDescUpToDate'
  | 'iconDescAtRisk'
  | 'iconDescOverdue'

export const confidenceTagMessages = defineMessages({
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
