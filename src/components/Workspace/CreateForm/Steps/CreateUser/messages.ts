import { defineMessages } from 'react-intl'

type CreateUserMessage =
  | 'userFirstNameLabel'
  | 'userFirstNamePlaceholder'
  | 'userLastNameLabel'
  | 'userLastNamePlaceholder'
  | 'userRoleLabel'
  | 'userRolePlaceholder'
  | 'userGenderLabel'
  | 'userGenderPlaceholder'
  | 'userGenderMaleOption'
  | 'userGenderFemaleOption'
  | 'userEmailLabel'
  | 'userEmailPlaceholder'
  | 'userLocaleLabel'
  | 'userLocalePlaceholder'
  | 'userLocalePTBROption'
  | 'userLocaleENUSOption'
  | 'userAutoInviteLabel'
  | 'userLocaleESAROption'

export default defineMessages<CreateUserMessage>({
  userFirstNameLabel: {
    defaultMessage: 'Nome do usuário inicial',
    id: 'vv49le',
    description: 'The user first name while creating a new workspace',
  },

  userFirstNamePlaceholder: {
    defaultMessage: 'Nome',
    id: 'Sau4Na',
    description: 'The user first name input placeholder while creating a new workspace',
  },

  userLastNameLabel: {
    defaultMessage: 'Sobrenome do usuário inicial',
    id: '2ao/tW',
    description: 'The user last name while creating a new workspace',
  },

  userLastNamePlaceholder: {
    defaultMessage: 'Sobrenome',
    id: 'xaHzA0',
    description: 'The user last name input placeholder while creating a new workspace',
  },

  userRoleLabel: {
    defaultMessage: 'Cargo do usuário inicial',
    id: 'hhH9fH',
    description: 'The user role while creating a new workspace',
  },

  userRolePlaceholder: {
    defaultMessage: 'Cargo',
    id: 'fFkPeH',
    description: 'The user role input placeholder while creating a new workspace',
  },

  userGenderLabel: {
    defaultMessage: 'Gênero do usuário inicial',
    id: '3XEc2H',
    description: 'The user gender while creating a new workspace',
  },

  userGenderPlaceholder: {
    defaultMessage: 'Gênero',
    id: 'Ln2GmC',
    description: 'The user gender input placeholder while creating a new workspace',
  },

  userGenderMaleOption: {
    defaultMessage: 'Masculino',
    id: 'PtUosx',
    description: 'The user gender male option while creating a new workspace',
  },

  userGenderFemaleOption: {
    defaultMessage: 'Feminino',
    id: 'vhq3gt',
    description: 'The user gender female option while creating a new workspace',
  },

  userEmailLabel: {
    defaultMessage: 'Email do usuário inicial',
    id: '9eQWJv',
    description: 'The user email while creating a new workspace',
  },

  userEmailPlaceholder: {
    defaultMessage: 'Email',
    id: 'EZ8KCj',
    description: 'The user email input placeholder while creating a new workspace',
  },

  userLocaleLabel: {
    defaultMessage: 'Idioma do usuário inicial',
    id: 'waPxPB',
    description: 'The user locale while creating a new workspace',
  },

  userLocalePlaceholder: {
    defaultMessage: 'Idioma',
    id: 'txi+kN',
    description: 'The user locale input placeholder while creating a new workspace',
  },

  userLocalePTBROption: {
    defaultMessage: 'Português',
    id: 'Q70h6c',
    description: 'The user locale pt-BR option while creating a new workspace',
  },

  userLocaleENUSOption: {
    defaultMessage: 'Inglês',
    id: 'loTYpj',
    description: 'The user locale en-US option while creating a new workspace',
  },

  userLocaleESAROption: {
    defaultMessage: 'Espanhol',
    id: '4xiLc/',
    description: 'The user locale es-AR option while creating a new workspace',
  },

  userAutoInviteLabel: {
    defaultMessage: 'Convidar usuário automaticamente',
    id: '/Duwsm',
    description:
      'This is the label that defines if we should automatically invite the new user while creating a new workspace',
  },
})
