import { defineMessages } from 'react-intl'

type IntroductionSpotlightMessages =
  | 'featureTitle'
  | 'firstCardTitle'
  | 'firstCardDescription'
  | 'secondCardTitle'
  | 'secondCardDescription'
  | 'thirdCardTitle'
  | 'thidCardDescription'
  | 'fourthCardTitle'
  | 'fourthCardDescription'

export default defineMessages<IntroductionSpotlightMessages>({
  featureTitle: {
    defaultMessage: 'SPOTLIGHT',
    id: 'pzFSON',
    description: 'This message appears how the title of the introduction to spotlight.',
  },

  firstCardTitle: {
    defaultMessage: 'Feedback colaborativo e visual',
    id: 'ukvrDN',
    description:
      'This message appears how the title of the first card in the Spotlight intro screen.',
  },

  firstCardDescription: {
    defaultMessage:
      'Com o Spotlight, o planejamento de sua estratégia é mais colaborativo e acessível para sua equipe. Os feedbacks são visíveis e didáticos.',
    id: 'UMWm2g',
    description:
      'This message appears as the description of the first card in the Spotlight intro screen and talks about feedback in Spotlight.',
  },

  secondCardTitle: {
    defaultMessage: 'Histórico de alterações',
    id: 'uSZ2US',
    description:
      'This message appears how the title of the second card in the Spotlight intro screen.',
  },

  secondCardDescription: {
    defaultMessage:
      'Você pode acompanhar todo o histórico de modificações de seus objetivos e resultados chave em um só lugar.',
    id: 'D7gTso',
    description:
      'This message appears as the description of the first card in the Spotlight intro screen and talks about the change history in Spotlight.',
  },

  thirdCardTitle: {
    defaultMessage: 'Modo rascunho',
    id: '0BeMry',
    description:
      'This message appears how the title of the third card in the Spotlight intro screen.',
  },

  thidCardDescription: {
    defaultMessage:
      'Permite que você refine e altere seus objetivos e resultados chaves antes de publicá-los oficialmente.',
    id: 'fW5djG',
    description:
      'This message appears as the description of the first card in the Spotlight intro screen and talks about the new draft mode in Spotlight.',
  },

  fourthCardTitle: {
    defaultMessage: 'Mágia da inteligência artificial ',
    id: 'si4MfT',
    description:
      'This message appears how the title of the fourth card in the Spotlight intro screen.',
  },

  fourthCardDescription: {
    defaultMessage:
      'Uma inteligência artificial foi incorporada para facilitar o entendimento seu e de sua equipe com relação ao planejamento e a estratégia de sua empresa.',
    id: '32UR9m',
    description:
      'This message appears as the description of the first card in the Spotlight intro screen and talks about the artificial intelligence resources available in Spotlight.',
  },
})
