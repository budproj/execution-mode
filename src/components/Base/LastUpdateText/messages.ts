import { MessageDescriptor, defineMessages } from 'react-intl'

type LastUpdateTextMessages = 'lastUpdateAt' | 'todayLabel' | 'yesterdayLabel' | 'emptyStateMessage'

export default defineMessages({
  lastUpdateAt: {
    defaultMessage: 'Última atualização {day} as {hour} por {author}',
    id: '3x3lDo',
    description: 'This message displays the latest report status for a given component',
  },

  todayLabel: {
    defaultMessage: 'Hoje',
    id: 'lII4JM',
    description: 'This label is displayed if the last update date is today',
  },

  yesterdayLabel: {
    defaultMessage: 'Ontem',
    id: 'TPAtkS',
    description: 'This label is displayed if the last update date is yesterday',
  },

  emptyStateMessage: {
    defaultMessage: 'Nenhuma atualização recente',
    id: '1HBRw6',
    description: 'This label is displayed if we do not have any update date to display',
  },
}) as Record<LastUpdateTextMessages, MessageDescriptor>
