import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage = 'forThisWeekTitle' | 'upToDateTitle'

export default defineMessages<ExploreTeamPageMessage>({
  forThisWeekTitle: {
    defaultMessage: 'PARA ESSA SEMANA',
    id: 'aLK74h',
    description: 'The title of the section of the key results without check-in in the week.',
  },
  upToDateTitle: {
    defaultMessage: 'CHECK-IN EM DIA',
    id: 'bmM4xB',
    description: 'The title of the section of the key results with an up to date check-in.',
  },
})
