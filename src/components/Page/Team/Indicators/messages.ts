import { defineMessages } from 'react-intl'

type TeamIndicatorsSectionMessages = 'sectionTitle' | 'explainFeatureTooltipMessage'

export default defineMessages<TeamIndicatorsSectionMessages>({
  sectionTitle: {
    defaultMessage: 'Indicadores de time',
    id: 'Q+b5ro',
    description: 'This message is the title of the Indicators section within a team page.',
  },

  explainFeatureTooltipMessage: {
    defaultMessage:
      'Lista contendo todos os membros de seu time organizados onde, os que necessitam de mais apoio da liderança no topo, e os que estão dentro da normalidade para o fim.',
    id: 'on7/f2',
    description: 'This message appears in a tootip that explain the feature to user.',
  },
})
