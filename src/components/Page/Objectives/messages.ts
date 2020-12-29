import { defineMessages, MessageDescriptor } from 'react-intl'

type ObjectivesPageMessage = 'pageTitle'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Objetivos',
    id: 'HpiBVM',
    description: 'The page title that our users should see in the objectives page',
  },
}) as Record<ObjectivesPageMessage, MessageDescriptor>

export default messages
