import { defineMessages } from 'react-intl'

type LastUpdateTextMessage = 'lastUpdateAt' | 'emptyStateMessage'

export default defineMessages<LastUpdateTextMessage>({
  lastUpdateAt: {
    defaultMessage: 'Última atualização {day} as {hour} por {author}',
    id: '3x3lDo',
    description: 'This message displays the latest report status for a given component',
  },

  emptyStateMessage: {
    defaultMessage: 'Nenhuma atualização recente',
    id: '1HBRw6',
    description: 'This label is displayed if we do not have any update date to display',
  },
})
