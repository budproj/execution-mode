import { defineMessages } from 'react-intl'

type ConfidenceTagMessage =
  | 'highShort'
  | 'highLong'
  | 'highIcon'
  | 'mediumShort'
  | 'mediumLong'
  | 'mediumIcon'
  | 'lowShort'
  | 'lowLong'
  | 'lowIcon'
  | 'barrierShort'
  | 'barrierLong'
  | 'barrierIcon'

export default defineMessages<ConfidenceTagMessage>({
  highShort: {
    defaultMessage: 'Alto',
    id: '4f4cWE',
    description: 'We use this tag to group every key result with confidence higher than 66',
  },

  highLong: {
    defaultMessage: 'Alta Confiança',
    id: 'QPGUqB',
    description: 'We use this tag to group every key result with confidence higher than 66',
  },

  highIcon: {
    defaultMessage: 'Um círculo verde, indicando que a confiança está alta',
    id: 'faL9vf',
    description: 'A brief explanation for screen readers regarding the green status circle',
  },

  mediumShort: {
    defaultMessage: 'Médio',
    id: 'XENgso',
    description:
      'We use this tag to group every key result with confidence higher than 33 but lower than 66',
  },

  mediumLong: {
    defaultMessage: 'Média Confiança',
    id: 'hPJxpx',
    description:
      'We use this tag to group every key result with confidence higher than 33 but lower than 66',
  },

  mediumIcon: {
    defaultMessage: 'Um círculo amarelo, indicando que a confiançá é média',
    id: 'kLkKtK',
    description: 'A brief explanation for screen readers regarding the yellow status circle',
  },

  lowShort: {
    defaultMessage: 'Baixo',
    id: 'B0G29o',
    description:
      'We use this tag to group every key result with confidence that is 0 or higher and lower than 25',
  },

  lowLong: {
    defaultMessage: 'Baixa Confiança',
    id: 'ff3h07',
    description:
      'We use this tag to group every key result with confidence higher than 33 but lower than 66',
  },

  lowIcon: {
    defaultMessage: 'Um círculo vermelho, indicando que a confiança está baixa',
    id: 'HAQ+JV',
    description: 'A brief explanation for screen readers regarding the red status circle',
  },

  barrierShort: {
    defaultMessage: 'Com Barreira',
    id: '0/VsDs',
    description: 'We use this tag to group every key result with confidence lower than 0',
  },

  barrierLong: {
    defaultMessage: 'Com Barreira',
    id: '0/VsDs',
    description: 'We use this tag to group every key result with confidence lower than 0',
  },

  barrierIcon: {
    defaultMessage: 'Um círculo roxo, indicando que o resultado-chave tem uma barreira',
    id: 'zEyzo8',
    description: 'A brief explanation for screen readers regarding the purple status circle',
  },
})
