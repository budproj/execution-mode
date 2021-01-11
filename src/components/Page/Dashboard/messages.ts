import { defineMessages } from 'react-intl'

type DashboardPageMessage = 'greeting'

export default defineMessages<DashboardPageMessage>({
  greeting: {
    defaultMessage: 'Bem-vind{gender, select, MALE {o} FEMALE {a} other {o}} de volta, {name} :)',
    id: 'gODdaE',
    description: 'The page title that our users should see in the dashboard page',
  },
})
