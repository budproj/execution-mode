import { defineMessages, MessageDescriptor } from 'react-intl'

type DashboardPageMessage = 'greeting'

const messages = defineMessages({
  greeting: {
    defaultMessage: 'Bem-vind{gender, select, MALE {o} FEMALE {a} other {o}} de volta, {name} :)',
    id: 'gODdaE',
    description: 'The page title that our users should see in the dashboard page',
  },
}) as Record<DashboardPageMessage, MessageDescriptor>

export default messages
