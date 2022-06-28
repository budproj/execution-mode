import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage = 'emptyStateCheckInNotifications'

export default defineMessages<ExploreTeamPageMessage>({
  emptyStateCheckInNotifications: {
    defaultMessage:
      'Você não tem check-ins pendentes porque não está envolvido em nenhum resultado-chave.',
    id: 'kTFIMk',
    description:
      'The page description that is displayed if the user has no key result in the check in notifications tab.',
  },
})
