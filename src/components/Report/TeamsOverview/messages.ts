import { defineMessages } from 'react-intl'

type TeamOverviewMessages =
  | 'teamRankingTitle'
  | 'teamRankingTitleWithoutGamification'
  | 'teamRankingSubTitle'

export default defineMessages<TeamOverviewMessages>({
  teamRankingTitle: {
    defaultMessage: 'Ranking de Times',
    id: 'ucALDM',
    description: 'Title to show on the team ranking page',
  },
  teamRankingTitleWithoutGamification: {
    defaultMessage: 'Progresso dos Times',
    id: 'dH7eW3',
    description: 'Title to show on the team ranking page when gamification is disabled',
  },
  teamRankingSubTitle: {
    defaultMessage: 'Progresso geral dos objetivos no ciclo atual',
    id: 'BROY+x',
    description: 'Subtitle to show on the team ranking page when gamification is disabled',
  },
})
