import { defineMessages } from 'react-intl'

type ExploreTeamMembersMessage = 'title'

export default defineMessages<ExploreTeamMembersMessage>({
  title: {
    defaultMessage: 'Membros do time {isLoaded, select, true {({totalMembersCount})} other{}}',
    id: 'jYw0F3',
    description: 'This message is displayed inside the explore page, above the members section',
  },
})
