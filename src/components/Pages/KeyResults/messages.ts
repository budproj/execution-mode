import { defineMessages, MessageDescriptor } from 'react-intl'

type KeyResultsPageMessage = 'pageTitle'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Minhas Key Results',
    id: 'tf3MiP',
    description: 'The page title that our users should see',
  },
}) as Record<KeyResultsPageMessage, MessageDescriptor>

export default messages
