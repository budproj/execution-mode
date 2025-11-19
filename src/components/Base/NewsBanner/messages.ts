import { defineMessages } from 'react-intl'

type NewsBannerMessages =
  | 'newsBannerTitle'
  | 'newsBannerDescription'
  | 'newsBannerButton'
  | 'newsBannerTag'

export default defineMessages<NewsBannerMessages>({
  newsBannerTitle: {
    defaultMessage:
      '¡El éxito no tiene fronteras! Chegou a Tradução para Espanhol e Novas Melhorias para Você.',
    id: 'cSm/iv',
    description:
      'This message appears on the news banner to invite the user to learn about the Spotlight feature.',
  },
  newsBannerDescription: {
    defaultMessage:
      'Agora com tradução completa para o Espanhol, facilitando a gestão de OKRs para todos, e filtros de tarefas aprimorados para você focar instantaneamente no que realmente importa :)',
    id: 'ik/N/l',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
  newsBannerButton: {
    defaultMessage: 'Saiba Mais',
    id: 'xabV3g',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
  newsBannerTag: {
    defaultMessage: 'Novidade!',
    id: 'DM6HaV',
    description: 'This message is used as the label for the news banner tag',
  },
})
