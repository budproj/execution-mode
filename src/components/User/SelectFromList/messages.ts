import { defineMessages } from 'react-intl'

type SelectUserFromListMessages =
  | 'searchPlaceholder'
  | 'newUserOption'
  | 'createUserOptionGroupIconDesc'

export default defineMessages<SelectUserFromListMessages>({
  searchPlaceholder: {
    defaultMessage: 'Buscar membros',
    id: 'wlwyTd',
    description: 'This message is used in the search input while searching for users',
  },

  newUserOption: {
    defaultMessage: 'Criar novo usuário',
    id: 'OwWiN7',
    description: 'This message appears as an option in the team page while adding a new user',
  },

  createUserOptionGroupIconDesc: {
    defaultMessage:
      'Um ícone com o sinal de "mais". Ao clicar aqui você irá abrir o menu para inserir um novo usuário',
    id: 'a8O2l+',
    description: 'This message is used in our new user button while seeing the user list',
  },
})
