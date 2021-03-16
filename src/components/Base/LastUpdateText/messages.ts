import { defineMessages } from 'react-intl'

type LastUpdateTextMessage = 'lastUpdateAt' | 'author' | 'emptyStateMessage'

export default defineMessages<LastUpdateTextMessage>({
  lastUpdateAt: {
    defaultMessage: 'Última atualização {unit, select, fallback {em {date}} other {{date}}}',
    id: 'xkN783',
    description: 'This message displays the latest report status for a given component',
  },

  author: {
    defaultMessage: 'por {author}',
    id: 'e9PG+t',
    description: 'This message displays the latest report author for a given component',
  },

  emptyStateMessage: {
    defaultMessage: 'Nenhuma atualização recente',
    id: '1HBRw6',
    description: 'This label is displayed if we do not have any update date to display',
  },
})
