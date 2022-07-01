import { defineMessages } from 'react-intl'

type LastUpdateTextMessage = 'prefix' | 'date' | 'author' | 'emptyStateMessage'

export default defineMessages<LastUpdateTextMessage>({
  prefix: {
    defaultMessage: 'Última atualização',
    id: '+XSqc3',
    description: 'This prefix is displayed as default in our last updated component',
  },

  date: {
    defaultMessage: '{unit, select, fallback {desde {date}} other {{date}}}',
    id: 'VSS4F8',
    description:
      'This text displays the latest report status for a given component, using a given date logic',
  },

  author: {
    defaultMessage: 'por {author}',
    id: 'e9PG+t',
    description: 'This message displays the latest report author for a given component',
  },

  emptyStateMessage: {
    defaultMessage: 'Nenhum check-in realizado',
    id: '8Ay4MQ',
    description: 'This label is displayed if we do not have any update date to display',
  },
})
