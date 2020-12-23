import { defineMessages, MessageDescriptor } from 'react-intl'

type KeyResultsPageMessage = 'pageTitle'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Minhas Key Results',
    id: 'khbEZF',
    description: 'The page title that our users should see in the key results page',
  },
}) as Record<KeyResultsPageMessage, MessageDescriptor>

export default messages
