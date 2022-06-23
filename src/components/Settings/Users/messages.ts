import { defineMessages } from 'react-intl'

type SettingsUsersPageMessage =
  | 'subTitle'
  | 'createUserButton'
  | 'pageDescription'
  | 'searchUserInput'

export default defineMessages<SettingsUsersPageMessage>({
  subTitle: {
    defaultMessage: 'Usuários',
    id: 'Zmw2VE',
    description: 'The subtitle page.',
  },

  pageDescription: {
    defaultMessage: 'Use este painel para configurar os usuários da plataforma.',
    id: '8B+4Un',
    description: 'The description page.',
  },

  createUserButton: {
    defaultMessage: 'Adicionar',
    id: 'epM1Xt',
    description: 'This button is used to create a new cycle.',
  },

  searchUserInput: {
    defaultMessage: 'Procurar pessoas',
    id: 'ql0LOi',
    description: 'This message appears as a label in users search input.',
  },
})
