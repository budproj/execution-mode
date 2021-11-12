import { defineMessages } from 'react-intl'

type CreateUserFormMessage =
  | 'firstNameLabel'
  | 'lastNameLabel'
  | 'emailLabel'
  | 'roleLabel'
  | 'genderLabel'
  | 'teamLabel'
  | 'pictureLabel'
  | 'maleGenderOption'
  | 'femaleGenderOption'
  | 'submitButtonLabel'
  | 'cancelButtonLabel'
  | 'successToastMessage'
  | 'existingUserErrorToastMessage'
  | 'unknownErrorToastMessage'

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

  maleGenderOption: {
    defaultMessage: 'Masculino',
    id: 'INrEzv',
    description: 'This is the male option while selecting a gender to create a new user',
  },

  femaleGenderOption: {
    defaultMessage: 'Feminino',
    id: 'L5w0P3',
    description: 'This is the female option while selecting a gender to create a new user',
  },

  submitButtonLabel: {
    defaultMessage: 'Criar usuári{gender, select, MALE {o} FEMALE {a} other {o}}',
    id: 'sgr1cM',
    description: 'The label of the submit button of the create user form',
  },

  cancelButtonLabel: {
    defaultMessage: 'Cancelar',
    id: 'acrz2t',
    description: 'The label of the cancel button of the create user form',
  },

  successToastMessage: {
    defaultMessage:
      'Usuári{gender, select, MALE {o} FEMALE {a} other {o}} criad{gender, select, MALE {o} FEMALE {a} other {o}} com sucesso',
    id: '4npgR9',
    description: 'This message appears when we create a new user as a toast',
  },

  unknownErrorToastMessage: {
    defaultMessage: 'Desculpe, aconteceu um erro inesperado. Tente novamente mais tarde',
    id: '2QbXJB',
    description:
      'This message appears as an error toast when we have an unknown error while creating a new user',
  },

  existingUserErrorToastMessage: {
    defaultMessage: 'Desculpe, mas já existe um usuário com este e-mail',
    id: 'GBh0Xf',
    description:
      'This message is used as an toast error message when we try to create an user with an existing e-mail',
  },
})
