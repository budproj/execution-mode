import { defineMessages } from 'react-intl'

type SelectUserFromListContentMessages =
  | 'addNewUserToTeam'
  | 'newUserOption'
  | 'addUserToTeamOption'
  | 'createUserOptionGroupIconDesc'
  | 'emptySearchState'
  | 'createNewUserButtonLabel'

export default defineMessages<SelectUserFromListContentMessages>({
  newUserOption: {
    defaultMessage: 'Criar novo usuário',
    id: 'OwWiN7',
    description: 'This message appears as an option in the team page while adding a new user',
  },
  addNewUserToTeam: {
    defaultMessage: 'Adicionar',
    id: 'XOLhDn',
    description:
      'This message appears on the add a user to the team button when the team is empty.',
  },

  addUserToTeamOption: {
    defaultMessage: 'Adicionar membro ao time',
    id: 'sJMgjv',
    description: 'This message appears as an option in the team page while adding a user to team',
  },

  createUserOptionGroupIconDesc: {
    defaultMessage:
      'Um ícone com o sinal de "mais". Ao clicar aqui você irá abrir o menu para inserir um novo usuário',
    id: 'a8O2l+',
    description: 'This message is used in our new user button while seeing the user list',
  },

  emptySearchState: {
    defaultMessage: 'Nenhuma pessoa encontrada',
    id: '+ajAuo',
    description:
      'This message appears in our user search when we try to search for a given user without any results',
  },

  createNewUserButtonLabel: {
    defaultMessage: 'Criar um usuário',
    id: 'pbVToL',
    description: 'This message appears as a button when a team has no members yet',
  },
})
