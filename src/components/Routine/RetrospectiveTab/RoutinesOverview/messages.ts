import { defineMessages } from 'react-intl'

type RoutinesOverviewMessages =
  | 'teamOverviewTitle'
  | 'weekText'
  | 'feelingGraphTitle'
  | 'productivityGraphTitle'

export default defineMessages<RoutinesOverviewMessages>({
  teamOverviewTitle: {
    defaultMessage: 'Visão geral do time',
    id: 'tvj+/n',
    description: 'The title of the team overview',
  },
  weekText: {
    defaultMessage: 'Semana',
    id: 'IfVw1+',
    description: 'The text that appears at the week description',
  },
  feelingGraphTitle: {
    defaultMessage: 'SENTIMENTO',
    id: 'duv/6P',
    description: 'The title of the feeling graph',
  },
  productivityGraphTitle: {
    defaultMessage: 'PRODUTIVIDADE',
    id: 'j1c4SD',
    description: 'The title of the productivity graph',
  },
})
