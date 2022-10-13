import { defineMessages } from 'react-intl'

type SupportTeamMessagesProperties =
  | 'weekRetrospectiveRoutineTitle'
  | 'calendarIconDescription'
  | 'weekRetrospectiveRoutineSubtitle'

export default defineMessages<SupportTeamMessagesProperties>({
  weekRetrospectiveRoutineTitle: {
    defaultMessage: 'Retrospectiva da semana',
    id: 'rDaIQ2',
    description: 'The title of the routine reminder notification',
  },
  calendarIconDescription: {
    defaultMessage: 'A calendar icon',
    id: 'H1CBmX',
    description: 'The calendar icon description that goes in the routine reminder notification',
  },
  weekRetrospectiveRoutineSubtitle: {
    defaultMessage: 'confira as novas respostas em',
    id: 'Glv+wL',
    description: 'The subtitle of the routine reminder notification',
  },
})
