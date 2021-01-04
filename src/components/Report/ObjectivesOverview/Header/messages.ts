import { defineMessages, MessageDescriptor } from 'react-intl'

type ObjectivesOverviewHeaderMessage = 'title'

const messages = defineMessages({
  title: {
    defaultMessage: 'Como estão as prioridades?',
    id: 'ktId0y',
    description: 'The title of the header section in our objectives overview report',
  },
}) as Record<ObjectivesOverviewHeaderMessage, MessageDescriptor>

export default messages
