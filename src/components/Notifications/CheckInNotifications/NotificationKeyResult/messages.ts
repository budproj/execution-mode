import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage = 'lastCheckInPrefix' | 'checkInButton'

export default defineMessages<ExploreTeamPageMessage>({
  lastCheckInPrefix: {
    defaultMessage: 'Último check-in',
    id: 'jwsMer',
    description: 'the prefix that is displayed in the last update checkmark.',
  },
  checkInButton: {
    defaultMessage: 'Fazer check-in',
    id: 'wjOjlb',
    description:
      'The title of the button to create a check-in in the check-in notifications tab, when clicked it opens the key result drawer.',
  },
})
