import { defineMessages } from 'react-intl'

type KeyResultsSectionSummarizeMessage =
  | 'AIInfo'
  | 'loadingMessage'
  | 'summarizeButtonMessage'
  | 'summarizeSectionTitle'

export default defineMessages<KeyResultsSectionSummarizeMessage>({
  AIInfo: {
    defaultMessage:
      'Todas as informações abaixo foram geradas por Inteligencia Artificial e são baseada nas interações que foram realizadas até o momento',
    id: 'PM6HqK',
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
})
