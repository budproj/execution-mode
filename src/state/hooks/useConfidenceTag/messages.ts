import { defineMessages } from 'react-intl'

type ConfidenceTagMessage =
  | 'achievedShort'
  | 'achievedLong'
  | 'achievedIcon'
  | 'achievedHelperText'
  | 'highShort'
  | 'highLong'
  | 'highIcon'
  | 'highHelperText'
  | 'mediumShort'
  | 'mediumLong'
  | 'mediumIcon'
  | 'mediumHelperText'
  | 'lowShort'
  | 'lowLong'
  | 'lowIcon'
  | 'lowHelperText'
  | 'barrierShort'
  | 'barrierLong'
  | 'barrierIcon'
  | 'barrierHelperText'
  | 'deprioritizedShort'
  | 'deprioritizedLong'
  | 'deprioritizedIcon'
  | 'deprioritizedHelperText'

export default defineMessages<ConfidenceTagMessage>({
  achievedShort: {
    defaultMessage: 'Alcançado',
    id: '1B6FoV',
    description: 'We use this tag to group every key result with confidence achieved',
  },
  achievedLong: {
    defaultMessage: 'Alcançado',
    id: '1B6FoV',
    description: 'We use this tag to group every key result with confidence achieved',
  },
  achievedIcon: {
    defaultMessage: 'Um círculo roxo, indicando que o resultado-chave tem uma barreira',
    id: 'zEyzo8',
    description: 'A brief explanation for screen readers regarding the purple status circle',
  },
  achievedHelperText: {
    defaultMessage: 'Este resultado-chave alcançou sua conclusão! :)',
    id: 'Nls8gh',
    description: 'This text explains our tag to the user',
  },

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

  highHelperText: {
    defaultMessage: 'Se tudo continuar assim, esperamos alcançar o resultado',
    id: 'CQAFfW',
    description: 'This text explains our tag to the user',
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

  mediumHelperText: {
    defaultMessage: 'Existe um risco de não alcançarmos o resultado-chave, mas seguimos otimistas',
    id: 'TIorHN',
    description: 'This text explains our tag to the user',
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

  lowHelperText: {
    defaultMessage: 'Não vamos alcançar o resultado a não ser que a gente mude nossa abordagem',
    id: 'rsHltm',
    description: 'This text explains our tag to the user',
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

  barrierHelperText: {
    defaultMessage: 'Existe um fator externo impedindo o progresso desse resultado-chave',
    id: 'xXxjVp',
    description: 'This text explains our tag to the user',
  },

  deprioritizedShort: {
    defaultMessage: 'Despriorizado',
    id: '/pxKno',
    description: 'We use this tag to group every key result that has been deprioritized',
  },

  deprioritizedLong: {
    defaultMessage: 'Despriorizado',
    id: '/pxKno',
    description: 'We use this tag to group every key result that has been deprioritized',
  },

  deprioritizedIcon: {
    defaultMessage: 'Um círculo roxo, indicando que o resultado-chave tem uma barreira',
    id: 'zEyzo8',
    description: 'A brief explanation for screen readers regarding the purple status circle',
  },

  deprioritizedHelperText: {
    defaultMessage: 'Este resultado-chave foi despriorizado e deixado de lado por enquanto.',
    id: 'iXij4+',
    description: 'This text explains our tag to the user',
  },
})
