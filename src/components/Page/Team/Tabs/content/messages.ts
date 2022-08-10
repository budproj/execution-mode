import { defineMessages } from 'react-intl'

type ExploreTeamTabsContentMessage =
  | 'tabRetrospectivePageTitle'
  | 'tabRetrospectivePageDescription'
  | 'tabRetrospectiveAnswerButton'

export default defineMessages<ExploreTeamTabsContentMessage>({
  tabRetrospectivePageTitle: {
    defaultMessage: 'Retrospectiva da Semana',
    id: 'uIY7F5',
    description: 'Title of the content of the Retrospective tab on the teams page.',
  },

  tabRetrospectivePageDescription: {
    defaultMessage:
      'Compartilhe suas as prioridades, conquistas e barreiras com seu time. Acompanhe e interaja com seus colegas sobre a jornada deles. Saiba mais',
    id: 'vcxPHH',
    description: 'Description of the content of the Retrospective tab on the teams page.',
  },

  tabRetrospectiveAnswerButton: {
    defaultMessage: 'Responder',
    id: 'N/fRMX',
    description: 'Button to Reply routine on the teams page.',
  },
})
