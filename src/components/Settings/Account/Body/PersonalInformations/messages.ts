import { defineMessages } from 'react-intl'

type SettingsAccountBodyPersonalInformationsMessage =
  | 'sectionTitle'
  | 'sectionSubtitle'
  | 'firstFieldLabel'
  | 'secondFieldLabel'
  | 'thirdFieldLabel'
  | 'fourthFieldLabel'
  | 'fifthFieldLabel'
  | 'sixthFieldLabel'
  | 'seventhFieldLabel'
  | 'fallbackFourthField'
  | 'fallbackFifthField'
  | 'fallbackSixthField'
  | 'fallbackSeventhField'

export default defineMessages<SettingsAccountBodyPersonalInformationsMessage>({
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

  firstFieldLabel: {
    defaultMessage: 'Nome',
    id: 'Y+MtZe',
    description:
      'This is the label that goes on our user account settings page, at the first field to update the user informations',
  },

  secondFieldLabel: {
    defaultMessage: 'Sobrenome',
    id: 'pXeDLf',
    description:
      'This is the label that goes on our user account settings page, at the second field to update the user informations',
  },

  thirdFieldLabel: {
    defaultMessage: 'Apelido',
    id: 'xVR0F1',
    description:
      'This is the label that goes on our user account settings page, at the third field to update the user informations',
  },

  fourthFieldLabel: {
    defaultMessage: 'Time',
    id: 'SvJM0q',
    description:
      'This is the label that goes on our user account settings page, at the fourth field to update the user informations',
  },

  fifthFieldLabel: {
    defaultMessage: 'Cargo',
    id: 'NYGW+N',
    description:
      'This is the label that goes on our user account settings page, at the fifth field to update the user informations',
  },

  sixthFieldLabel: {
    defaultMessage: 'Gênero',
    id: 'nnWr7M',
    description:
      'This is the label that goes on our user account settings page, at the sixth field to update the user informations',
  },

  seventhFieldLabel: {
    defaultMessage: 'Sobre você',
    id: '8EABR0',
    description:
      'This is the label that goes on our user account settings page, at the seventh field to update the user informations',
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
    defaultMessage: 'Escreva sobre você',
    id: 'k0fMvn',
    description:
      'This is the fallback value that goes on our user account settings page, at the seventh field to update the user informations. The fallback value appears if the user has no data at that field',
  },
})
