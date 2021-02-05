import { defineMessages } from 'react-intl'

type KeyResultsSectionCheckInMessage =
  | 'buttonLabelOpen'
  | 'buttonLabelClose'
  | 'formTitle'
  | 'closeIconAlt'
  | 'closeIconTitle'

export default defineMessages<KeyResultsSectionCheckInMessage>({
  buttonLabelOpen: {
    defaultMessage: 'Fazer check-in',
    id: '6spUEn',
    description:
      'This message is displayed as a label button when the check-in form is closed in our key result section',
  },

  buttonLabelClose: {
    defaultMessage: 'Cancelar check-in',
    id: 'Nafqgw',
    description:
      'This message is displayed as a label button when the check-in form is opened in our key result section',
  },

  formTitle: {
    defaultMessage: 'Check-in',
    id: 'sFYaLE',
    description: 'This message is displayed as the form title, above the check-in form',
  },

  closeIconAlt: {
    defaultMessage: 'Clique aqui para fechar o formulário de check-in',
    id: 'DrLml8',
    description:
      'This message is displayed as the alternative text for the close button in our check-in form',
  },

  closeIconTitle: {
    defaultMessage: 'Fechar',
    id: 'Zmffm0',
    description:
      'This message is displayed as the title text for our close icon in our check-in form',
  },
})
