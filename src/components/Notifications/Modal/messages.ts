import { defineMessages } from 'react-intl'

type UserEmptyStateMessage = 'title'

export default defineMessages<UserEmptyStateMessage>({
  title: {
    defaultMessage: 'Não tem ninguém aqui',
    id: '0PaRUc',
    description: 'This message appears when there is no user in a given list',
  },
})
