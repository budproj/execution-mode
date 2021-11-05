import { defineMessages } from 'react-intl'

type CreateUserFormMessage =
  | 'firstNameLabel'
  | 'lastNameLabel'
  | 'emailLabel'
  | 'roleLabel'
  | 'genderLabel'
  | 'teamLabel'
  | 'pictureLabel'
  | 'submitButtonLabel'

export default defineMessages<CreateUserFormMessage>({
  firstNameLabel: {
    defaultMessage: 'Nome',
    id: 'PSCS+h',
    description: 'The label of the first name field in the create user form',
  },

  lastNameLabel: {
    defaultMessage: 'Sobrenome',
    id: 'yw+DGB',
    description: 'The label of the last name field in the create user form',
  },

  emailLabel: {
    defaultMessage: 'Email',
    id: 'eVsyB5',
    description: 'The label of the email field in the create user form',
  },

  roleLabel: {
    defaultMessage: 'Cargo',
    id: 'PxWBQZ',
    description: 'The label of the role field in the create user form',
  },

  genderLabel: {
    defaultMessage: 'Gênero',
    id: 'SL45P4',
    description: 'The label of the gender field in the create user form',
  },

  teamLabel: {
    defaultMessage: 'Time',
    id: 'SRIfUY',
    description: 'The label of the team field in the create user form',
  },

  pictureLabel: {
    defaultMessage: 'Foto',
    id: 'cz6EUM',
    description: 'The label of the picture field in the create user form',
  },

  submitButtonLabel: {
    defaultMessage: 'Criar usuári{gender, select, MALE {o} FEMALE {a} other {o}}',
    id: 'xw3Bb5',
    description: 'The label of the submit button of our form',
  },
})
