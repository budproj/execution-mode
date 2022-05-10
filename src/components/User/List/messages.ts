import { defineMessages } from 'react-intl'

type UserListMessages =
  | 'emptyState'
  | 'optionsButtonDesc'
  | 'firstMenuItemOption'
  | 'secondMenuItemOption'

export default defineMessages<UserListMessages>({
  emptyState: {
    defaultMessage: 'Nenhuma pessoa',
    id: '8+y0VC',
    description: 'This message appears when there is no user to display in a given user list',
  },

  optionsButtonDesc: {
    defaultMessage: 'Botão de opções',
    id: 'jzx+Hl',
    description:
      'This button allows you to choose an option that directs the user to the users profile or details.',
  },

  firstMenuItemOption: {
    defaultMessage: 'Ir para o perfil',
    id: 'YFb9UA',
    description: 'This option will redirect the user to the selected user profile.',
  },

  secondMenuItemOption: {
    defaultMessage: 'Ver detalhes',
    id: 'Sb6dkV',
    description: 'This option will show a sidebar with the details of the selected user.',
  },
})
