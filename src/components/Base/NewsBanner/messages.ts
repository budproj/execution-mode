import { defineMessages } from 'react-intl'

type NewsBannerMessages = 'newsBannerTitle' | 'newsBannerDescription' | 'newsBannerButton'

export default defineMessages<NewsBannerMessages>({
  newsBannerTitle: {
    defaultMessage: 'NOVO FAROL DE BOAS PRÁTICAS',
    id: 'P48rc3',
    description:
      'This message appears on the news banner to invite the user to learn about the Spotlight feature.',
  },
  newsBannerDescription: {
    defaultMessage:
      'A cada semana novos desafios personalizados que ajudam você e seu time a se manterem dentro das melhores práticas de implementação de OKRs',
    id: 'A4WTq8',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
  newsBannerButton: {
    defaultMessage: 'Saiba Mais',
    id: 'xabV3g',
    description:
      'This message appears on action button that redirect the user to company page on Spotlight tab',
  },
})
