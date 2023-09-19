import { defineMessages } from 'react-intl'

type DashboardMissionControlMessages = 'mainTeam' | 'makeMainTeam'

export default defineMessages<DashboardMissionControlMessages>({
  mainTeam: {
    defaultMessage: 'Time principal',
    id: '6ws/gr',
    description: 'The title of the main team section',
  },
  makeMainTeam: {
    defaultMessage: 'Tornar time principal?',
    id: '3MleM/',
    description: 'The label of the button that makes the team the main team',
  },
})
