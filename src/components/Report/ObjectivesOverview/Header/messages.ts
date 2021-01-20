import { defineMessages } from 'react-intl'

type ObjectivesOverviewHeaderMessage = 'title'

export default defineMessages<ObjectivesOverviewHeaderMessage>({
  title: {
    defaultMessage:
      'Como estão as prioridades d{gender, select, MALE {o} FEMALE {a} other {o}} {team}?',
    id: 'VhgGax',
    description: 'The title of the header section in our objectives overview report',
  },
})
