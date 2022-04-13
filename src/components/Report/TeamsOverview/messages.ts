import { defineMessages } from 'react-intl'

type TeamOverviewMessages = 'teamRankingTitle'

export default defineMessages<TeamOverviewMessages>({
  teamRankingTitle: {
    defaultMessage: 'Ranking de Times do {quarter}',
    id: 'ucALDM',
    description: 'Title to show on the team ranking page',
  },
})
