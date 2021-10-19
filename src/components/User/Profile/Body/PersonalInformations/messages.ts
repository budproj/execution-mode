import { defineMessages } from 'react-intl'

type UserProfileBodyPersonalInformationsMessage =
  | 'sectionTitle'
  | 'sectionSubtitle'
  | 'firstNameFieldLabel'
  | 'lastNameFieldLabel'
  | 'nicknameFieldLabel'
  | 'teamsFieldLabel'
  | 'roleFieldLabel'
  | 'genderFieldLabel'
  | 'aboutFieldLabel'
  | 'emailFieldLabel'
  | 'fallbackFourthField'
  | 'fallbackFifthField'
  | 'fallbackSixthField'
  | 'fallbackSeventhField'

export default defineMessages<UserProfileBodyPersonalInformationsMessage>({
  sectionTitle: {
    defaultMessage: 'Informações pessoais',
    id: 'r1mfc1',
    description:
      'This title is displayed as the heading of the personal informations section in our user account settings page',
  },

  sectionSubtitle: {
    defaultMessage: 'Escolha como suas informações aparecerão para os outros usuários.',
    id: 'H/aZym',
    description:
      'This subtitle is displayed as the subtitle of the personal informations section in our user account settings page',
  },

  firstNameFieldLabel: {
    defaultMessage: 'Nome',
    id: 'Y+MtZe',
    description:
      'This is the label that goes on our user account settings page, at the first field to update the user informations',
  },

  lastNameFieldLabel: {
    defaultMessage: 'Sobrenome',
    id: 'pXeDLf',
    description:
      'This is the label that goes on our user account settings page, at the second field to update the user informations',
  },

  nicknameFieldLabel: {
    defaultMessage: 'Apelido',
    id: 'xVR0F1',
    description:
      'This is the label that goes on our user account settings page, at the third field to update the user informations',
  },

  teamsFieldLabel: {
    defaultMessage: 'Times',
    id: 'bdkUKs',
    description:
      'This is the label that goes on our user account settings page, at the fourth field to update the user informations',
  },

  roleFieldLabel: {
    defaultMessage: 'Cargo',
    id: 'NYGW+N',
    description:
      'This is the label that goes on our user account settings page, at the fifth field to update the user informations',
  },

  genderFieldLabel: {
    defaultMessage: 'Gênero',
    id: 'nnWr7M',
    description:
      'This is the label that goes on our user account settings page, at the sixth field to update the user informations',
  },

  aboutFieldLabel: {
    defaultMessage:
      'Sobre {isMyUser, select, true {você} other {{gender, select, MALE {o} FEMALE {a} other {o}} {firstName}}}',
    id: 'LDLFtf',
    description:
      'This is the label that goes on our user account settings page, at the seventh field to update the user informations',
  },

  emailFieldLabel: {
    defaultMessage: 'Email',
    id: 'Dxj0ms',
    description:
      'This is the label that goes on our user account settings page, at the email field to update the user informations',
  },

  fallbackFourthField: {
    defaultMessage: 'Selecione seus times',
    id: 'FPhsI3',
    description:
      'This is the fallback value that goes on our user account settings page, at the fourth field to update the user informations. The fallback value appears if the user has no data at that field',
  },

  fallbackFifthField: {
    defaultMessage: 'Atualize seu cargo',
    id: 'RrW2fc',
    description:
      'This is the fallback value that goes on our user account settings page, at the fifth field to update the user informations. The fallback value appears if the user has no data at that field',
  },

  fallbackSixthField: {
    defaultMessage: 'Selecione seu gênero',
    id: '9sw0lJ',
    description:
      'This is the fallback value that goes on our user account settings page, at the sixth field to update the user informations. The fallback value appears if the user has no data at that field',
  },

  fallbackSeventhField: {
    defaultMessage:
      'Escreva sobre {isMyUser, select, true {você} other {{gender, select, MALE {o} FEMALE {a} other {o}} {firstName}}}',
    id: 'n3PYQR',
    description:
      'This is the fallback value that goes on our user account settings page, at the seventh field to update the user informations. The fallback value appears if the user has no data at that field',
  },
})
