import { defineMessages } from 'react-intl'

type teamIndicatorsTableMessages = 'teamIndicatorsTableColumnHeaderMessage'

export default defineMessages<teamIndicatorsTableMessages>({
  teamIndicatorsTableColumnHeaderMessage: {
    defaultMessage:
      '{columnAccessor, select, userKeyResultsOverview {Progresso em krs.} lastAccess {Último acesso} checkin {Check-in} checklist {Check-list} lastRetrospectiveAnswer {Retrospectiva} other {}}',
    id: 'yKixKH',
    description: 'This message appears in the header of each column of a Team Indicators table.',
  },
})
