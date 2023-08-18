import { defineMessages } from 'react-intl'

type TeamMenuMessages = 'teamMenuTitle' | 'otherTeamsTitle' | 'arrowIconDescription'

export default defineMessages<TeamMenuMessages>({
  teamMenuTitle: {
    defaultMessage: 'Seus times',
    id: 'GQGCSQ',
    description: 'MainAppBar user menu first item option',
  },
  otherTeamsTitle: {
    defaultMessage: 'Outros times',
    id: 'cbYPl0',
    description: 'MainAppBar user menu first item option',
  },
  arrowIconDescription: {
    defaultMessage: 'The arrow icon to the right',
    id: '8o0/Bc',
    description: 'MainAppBar user menu first item option',
  },
})
