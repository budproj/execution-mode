import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage =
  | 'emptyStateThisWeekNotifications'
  | 'emptyStateThisWeekNotificationsTitle'

export default defineMessages<ExploreTeamPageMessage>({
  emptyStateThisWeekNotifications: {
    defaultMessage: 'Você está em dia com seus compromissos no Bud.',
    id: 'nqlxOI',
    description:
      'The page description that is displayed if the user has no key result in the this week notifications tab.',
  },
  emptyStateThisWeekNotificationsTitle: {
    defaultMessage: 'Relaxe! Está tudo certo por aqui :)',
    id: 'sQAoOl',
    description:
      'The page title that is displayed if the user has no key result in the this week notifications tab.',
  },
})
