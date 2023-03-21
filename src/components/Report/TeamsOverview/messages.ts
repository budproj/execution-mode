import { defineMessages } from 'react-intl'

type TeamOverviewMessages =
  | 'teamRankingTitle'
  | 'teamRankingTitleWithoutGamification'
  | 'teamRankingSubTitle'

export default defineMessages<TeamOverviewMessages>({
  teamRankingTitle: {
    defaultMessage: 'Ranking de Times',
    id: 'nx5pvZ',
    description: 'Title to show on the team ranking page',
  },
  teamRankingTitleWithoutGamification: {
    defaultMessage: 'Progresso dos Times',
    id: 'yh+jAH',
    description: 'Title to show on the team ranking page when gamification is disabled',
  },
  teamRankingSubTitle: {
    defaultMessage: 'Progresso geral dos objetivos no ciclo atual',
    id: '8Qz7RP',
    description: 'Subtitle to show on the team ranking page when gamification is disabled',
  },
})
