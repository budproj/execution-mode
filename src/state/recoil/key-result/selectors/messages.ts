import { defineMessages, MessageDescriptor } from 'react-intl'

type ConfidenceTagMessages =
  | 'high'
  | 'medium'
  | 'low'
  | 'iconDescHigh'
  | 'iconDescMedium'
  | 'iconDescLow'

export const confidenceTagMessages = defineMessages({
  high: {
    defaultMessage: 'Alto',
    id: 'MBkjzW',
    description: 'We use this tag to group every key result with confidence higher than 50',
  },

  medium: {
    defaultMessage: 'Médio',
    id: 'Yk89cv',
    description:
      'We use this tag to group every key result with confidence higher than 25 but lower than 50',
  },

  low: {
    defaultMessage: 'Baixo',
    id: 'nRf9bk',
    description: 'We use this tag to group every key result with confidence lower than 25',
  },

  iconDescHigh: {
    defaultMessage: 'Um círculo verde, indicando que a confiança está alta',
    id: 'faL9vf',
    description: 'A brief explanation for screen readers regarding the green status circle',
  },

  iconDescMedium: {
    defaultMessage: 'Um círculo amarelo, indicando que a confiançá é média',
    id: 'kLkKtK',
    description: 'A brief explanation for screen readers regarding the yellow status circle',
  },

  iconDescLow: {
    defaultMessage: 'Um círculo vermelho, indicando que a confiança está baixa',
    id: 'HAQ+JV',
    description: 'A brief explanation for screen readers regarding the red status circle',
  },
}) as Record<ConfidenceTagMessages, MessageDescriptor>
