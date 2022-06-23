import { defineMessages } from 'react-intl'

type CyclesListBodyColumnActionsMessage =
  | 'optionsButtonDesc'
  | 'firstMenuItemOption'
  | 'secondMenuItemOption'
  | 'thirdMenuItemOption'
  | 'thirdMenuItemOptionII'
  | 'unknownErrorToastMessage'
  | 'successSendEmailToResetPasswordToastMessage'
  | 'successReactivateUserToastMessage'
  | 'confirmationDeactivateUserLabel'

export default defineMessages<CyclesListBodyColumnActionsMessage>({
  optionsButtonDesc: {
    defaultMessage: 'Botão de opções.',
    id: 'vrROtV',
    description:
      'This button allows you to view details, reset password or deactivate a users account.',
  },

  firstMenuItemOption: {
    defaultMessage: 'Ver detalhes',
    id: '61S7n7',
    description: 'This message is the description of the option to view details  of a user.',
  },

  secondMenuItemOption: {
    defaultMessage: 'Redefinir senha',
    id: 'minQA9',
    description: 'This message is the description of the option to alter password of a user.',
  },

  thirdMenuItemOption: {
    defaultMessage: 'Desativar conta',
    id: 'GKl+a6',
    description: 'This message is the description of the option to deactivate a user account.',
  },

  thirdMenuItemOptionII: {
    defaultMessage: 'Reativar conta',
    id: 'xIe3i6',
    description: 'This message is the description of the option to reactivate a user account.',
  },

  unknownErrorToastMessage: {
    defaultMessage: 'Desculpe, aconteceu um erro inesperado. Tente novamente mais tarde',
    id: 'cGFQsk',
    description:
      'This message appears as an error toast when we have an unknown error while creating a new cycle',
  },

  successSendEmailToResetPasswordToastMessage: {
    defaultMessage: 'Email de redefinição de senha enviado com sucesso.',
    id: 'VW9LHA',
    description: 'This message appears in a toast after the user ask to reset password.',
  },

  successReactivateUserToastMessage: {
    defaultMessage: 'Você reativou {name} com sucesso.',
    id: 'AQkkKh',
    description: 'This message appears in a toast after reactivating a user.',
  },

  confirmationDeactivateUserLabel: {
    defaultMessage: 'desativar usuário',
    id: 'h4VH9f',
    description: 'This message appears in button to confirm the deactivate user action.',
  },
})
