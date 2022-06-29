import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage = 'forThisWeekTitle' | 'upToDateTitle'

export default defineMessages<ExploreTeamPageMessage>({
  forThisWeekTitle: {
    defaultMessage: 'Para essa semana',
    id: 'XGKUNq',
    description: 'The title of the section of the key results without check-in in the week.',
  },
  upToDateTitle: {
    defaultMessage: 'Check-in em dia',
    id: 'hJZjes',
    description: 'The title of the section of the key results with an up to date check-in.',
  },
})
