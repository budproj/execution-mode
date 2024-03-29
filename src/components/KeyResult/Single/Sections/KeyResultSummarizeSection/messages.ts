import { defineMessages } from 'react-intl'

type KeyResultsSectionSummarizeMessage =
  | 'AIInfo'
  | 'loadingMessage'
  | 'summarizeButtonMessage'
  | 'summarizeSectionTitle'
  | 'newBetaTag'
  | 'feedbackTitle'
  | 'thumbsUpIconButtonDescription'
  | 'thumbsDownIconButtonDescription'

export default defineMessages<KeyResultsSectionSummarizeMessage>({
  AIInfo: {
    defaultMessage:
      'Todas as informações acima foram geradas por Inteligencia Artificial e são baseada nas interações que foram realizadas até o momento',
    id: '/Kf8kO',
    description: 'The message under the Summarized Key Result',
  },

  loadingMessage: {
    defaultMessage: 'Escolhendo o melhor baralho para mágica',
    id: 'ZTu/g+',
    description: 'The message when the Summarized Key Result is loading.',
  },

  summarizeButtonMessage: {
    defaultMessage: 'Entenda melhor este resultado-chave',
    id: 'w+FqA/',
    description:
      'The message in the button that when clicked, loads the generated summarized key result.',
  },

  summarizeSectionTitle: {
    defaultMessage: 'EVOLUÇÃO DO RESULTADO CHAVE',
    id: '2Hlwn7',
    description: 'The section of the summarize button title',
  },

  newBetaTag: {
    defaultMessage: 'beta',
    id: 'l+s/aT',
    description: 'The tag that indicates the beta version of the feature',
  },

  feedbackTitle: {
    defaultMessage: 'Gostou do conteúdo?',
    id: '+OsA1N',
    description: 'The title of the feedback line',
  },
  thumbsUpIconButtonDescription: {
    defaultMessage: 'O botão de sinal positivo para o sumário gerado.',
    id: 'c1bily',
    description: 'The description for the thumbs up button',
  },
  thumbsDownIconButtonDescription: {
    defaultMessage: 'O botão de sinal negativo para o sumário gerado.',
    id: 'I1Yqrr',
    description: 'The description for the thumbs down button',
  },
})
