import { defineMessages } from 'react-intl'

type ExploreTeamChildTeamsMessage = 'title' | 'emptyState' | 'searchPlaceholder'

export default defineMessages<ExploreTeamChildTeamsMessage>({
  title: {
    defaultMessage: 'Subtimes {isLoaded, select, true {({totalTeamsCount})} other{}}',
    id: 'NojznG',
    description: 'This message is displayed inside the explore page, above the child teams section',
  },

  emptyState: {
    defaultMessage: 'Este time não possui nenhum subtime.',
    id: 'DsPsDZ',
    description:
      'This message is displayed in our team plage inside the child teams section when that team has no child teams',
  },

  searchPlaceholder: {
    defaultMessage: 'Buscar subtimes',
    id: '/H4hHb',
    description: 'This message is displayed inside the child teams section, on the search bar',
  },
})
