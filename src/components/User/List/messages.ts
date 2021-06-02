import { defineMessages } from 'react-intl'

type UserListMessages = 'emptyState'

export default defineMessages<UserListMessages>({
  emptyState: {
    defaultMessage: 'Nenhuma pessoa encontrada',
    id: 'DJm8nF',
    description:
      'This message is displayed when the key-result drawers update owner option user list has no users to display. This usually happens when the user tries to search but there is no results',
  },
})
