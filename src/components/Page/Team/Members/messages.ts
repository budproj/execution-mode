import { defineMessages } from 'react-intl'

type ExploreTeamMembersMessage = 'title' | 'emptyStateTitle'

export default defineMessages<ExploreTeamMembersMessage>({
  title: {
    defaultMessage: 'Membros do time {isLoaded, select, true {({totalMembersCount})} other{}}',
    id: 'jYw0F3',
    description: 'This message is displayed inside the explore page, above the members section',
  },

  emptyStateTitle: {
    defaultMessage: 'Este time não possui membros',
    id: 'MHv/ZI',
    description: 'This message is displayed when there is no users in a given team',
  },
})
