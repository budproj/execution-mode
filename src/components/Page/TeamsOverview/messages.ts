import { defineMessages, MessageDescriptor } from 'react-intl'

type TeamsOverviewPageMessage = 'pageTitle'

const messages = defineMessages({
  pageTitle: {
    defaultMessage: 'Visão Geral',
    id: '++WixA',
    description: 'The page title that our users should see in the teams overview page',
  },
}) as Record<TeamsOverviewPageMessage, MessageDescriptor>

export default messages
