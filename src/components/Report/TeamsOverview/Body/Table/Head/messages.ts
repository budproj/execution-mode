import { defineMessages } from 'react-intl'

type TeamsOverviewBodyMessage = 'firstColumnTitle' | 'secondColumnTitle' | 'thirdColumnTitle'

export default defineMessages<TeamsOverviewBodyMessage>({
  firstColumnTitle: {
    defaultMessage: 'Posição do time',
    id: 'CkCxOl',
    description:
      'The title of the first column in our body table at the teams overview report in our dashboard',
  },

  secondColumnTitle: {
    defaultMessage: 'Progresso',
    id: '+r3NGz',
    description:
      'The title of the second column in our body table at the teams overview report in our dashboard',
  },

  thirdColumnTitle: {
    defaultMessage: 'Última sexta-feira',
    id: '28q7aO',
    description:
      'The title of the third column in our body table at the teams overview report in our dashboard',
  },
})
