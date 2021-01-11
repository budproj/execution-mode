import { defineMessages } from 'react-intl'

type ConfidenceTagMessage =
  | 'high'
  | 'medium'
  | 'low'
  | 'barrier'
  | 'iconDescHigh'
  | 'iconDescMedium'
  | 'iconDescLow'
  | 'iconDescBarrier'

export const confidenceTagMessages = defineMessages<ConfidenceTagMessage>({
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
    id: 'B0G29o',
    description:
      'We use this tag to group every key result with confidence that is 0 or higher and lower than 25',
  },

  barrier: {
    defaultMessage: 'Com Barreira',
    id: '0/VsDs',
    description: 'We use this tag to group every key result with confidence lower than 0',
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

  iconDescBarrier: {
    defaultMessage: 'Um círculo roxo, indicando que o resultado-chave tem uma barreira',
    id: 'zEyzo8',
    description: 'A brief explanation for screen readers regarding the purple status circle',
  },
})
