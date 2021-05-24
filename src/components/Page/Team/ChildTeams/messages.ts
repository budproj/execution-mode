import { defineMessages } from 'react-intl'

type ExploreTeamChildTeamsMessage = 'title'

export default defineMessages<ExploreTeamChildTeamsMessage>({
  title: {
    defaultMessage: 'Subtimes {isLoaded, select, true {({totalTeamsCount})} other{}}',
    id: 'NojznG',
    description: 'This message is displayed inside the explore page, above the child teams section',
  },
})
