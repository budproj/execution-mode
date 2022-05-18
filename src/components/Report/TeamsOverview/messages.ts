import { defineMessages } from 'react-intl'

type TeamOverviewMessages = 'teamRankingTitle' | 'teamRankingTitleWithoutGamification'

export default defineMessages<TeamOverviewMessages>({
  teamRankingTitle: {
    defaultMessage: 'Ranking de Times do {quarter}',
    id: 'ucALDM',
    description: 'Title to show on the team ranking page',
  },
  teamRankingTitleWithoutGamification: {
    defaultMessage: 'Progresso dos Times no {quarter}',
    id: 'dH7eW3',
    description: 'Title to show on the team ranking page when gamification is disabled',
  },
})
