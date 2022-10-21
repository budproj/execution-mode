import { defineMessages } from 'react-intl'

type ExploreTeamTabsContentMessage =
  | 'tabRetrospectivePageTitle'
  | 'tabRetrospectivePageDescription'
  | 'tabRetrospectiveAnswerButton'
  | 'learnMoreRetrospectiveMessage'
  | 'learnMoreRetrospectiveIcon'
  | 'routineSettingsActive'
  | 'routineSettingsInactive'
  | 'routineSettingsButton'

export default defineMessages<ExploreTeamTabsContentMessage>({
  tabRetrospectivePageTitle: {
    defaultMessage: 'Retrospectiva da Semana',
    id: 'uIY7F5',
    description: 'Title of the content of the Retrospective tab on the teams page.',
  },

  tabRetrospectivePageDescription: {
    defaultMessage:
      'Compartilhe suas as prioridades, conquistas e barreiras com seu time. Acompanhe e interaja com seus colegas sobre a jornada deles.',
    id: 'kAwViv',
    description: 'Description of the content of the Retrospective tab on the teams page.',
  },

  tabRetrospectiveAnswerButton: {
    defaultMessage: 'Responder',
    id: 'N/fRMX',
    description: 'Button to Reply routine on the teams page.',
  },

  learnMoreRetrospectiveMessage: {
    defaultMessage: 'Saiba mais',
    id: 'e+r00n',
    description: 'A link to a page that talks about the retrospective routine.',
  },

  learnMoreRetrospectiveIcon: {
    defaultMessage:
      'Um ícone de seta para a direita, usado no contexto de um link que redireciona o usuário para a página onde fala sobre a rotina de retrospectiva.',
    id: 'how6b8',
    description:
      'A right arrow icon, used in the context of a link that redirects the user to the page where the retrospective routine is discussed.',
  },

  routineSettingsActive: {
    defaultMessage: 'Lembrete ativo',
    id: 'pbBzqW',
    description: 'Message displayed when the routine notifications are active.',
  },

  routineSettingsInactive: {
    defaultMessage: 'Lembrete inativo',
    id: 'Wk0KQD',
    description: 'Message displayed when the routine notifications are inactive.',
  },

  routineSettingsButton: {
    defaultMessage: 'Routine notification settings button',
    id: 'X+heBq',
    description: 'Label for routine notification settings button',
  },
})
