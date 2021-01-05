import { defineMessages, MessageDescriptor } from 'react-intl'

type KeyResultsPageMessage = 'pageTitle'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Resultados-chave',
    id: 'l1LZCB',
    description: 'The page title that our users should see in the key results page',
  },
}) as Record<KeyResultsPageMessage, MessageDescriptor>

export default messages
