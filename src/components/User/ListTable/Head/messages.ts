import { defineMessages } from 'react-intl'

type UsersTableListHeadMessage =
  | 'listHeadName'
  | 'listHeadActions'
  | 'listHeadTeams'
  | 'listHeadRole'
  | 'listHeadState'

export default defineMessages<UsersTableListHeadMessage>({
  listHeadName: {
    defaultMessage: 'Nome',
    id: 'wat5HS',
    description:
      'This message is displayed as the column header for the users table in the user name column',
  },

  listHeadActions: {
    defaultMessage: 'Ações',
    id: 'f6KTde',
    description:
      'This message is displayed as the column header for the users table in the actions column',
  },

  listHeadTeams: {
    defaultMessage: 'Times',
    id: 'vEzcix',
    description:
      'This message is displayed as the column header for the users table in the teams column',
  },

  listHeadRole: {
    defaultMessage: 'Papel',
    id: 'zmPWcg',
    description:
      'This message is displayed as the column header for the users table in the role column',
  },

  listHeadState: {
    defaultMessage: 'Estado',
    id: 'tmyaek',
    description:
      'This message is displayed as the column header for the users table in the state column',
  },
})
