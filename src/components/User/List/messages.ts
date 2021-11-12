import { defineMessages } from 'react-intl'

type UserListMessages = 'emptyState'

export default defineMessages<UserListMessages>({
  emptyState: {
    defaultMessage: 'Nenhuma pessoa',
    id: '8+y0VC',
    description: 'This message appears when there is no user to display in a given user list',
  },
})
