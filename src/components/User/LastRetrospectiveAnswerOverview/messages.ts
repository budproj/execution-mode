import { defineMessages } from 'react-intl'

type lastRetrospectiveOverviewMessages =
  | 'lastRetrospectiveAnswerOverviewEmptyStateMessage'
  | 'roadblockIconLabel'

export default defineMessages<lastRetrospectiveOverviewMessages>({
  lastRetrospectiveAnswerOverviewEmptyStateMessage: {
    defaultMessage: 'Sem resposta',
    id: 'ZZ+KxU',
    description: 'This message is displayed inside the empty state on last retrospective overview',
  },

  roadblockIconLabel: {
    defaultMessage: '{hasBlock, select, y {Sim} n {Não} other {}}',
    id: 'GlsTIu',
    description:
      'This message appears as a label on the icon representing the user lock status in the last retrospective.',
  },
})
