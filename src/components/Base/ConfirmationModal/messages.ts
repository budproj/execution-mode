import { defineMessages } from 'react-intl'

type ConfirmationModalMessage =
  | 'titleFallback'
  | 'confirmationButtonFallback'
  | 'cancelButtonFallback'
  | 'iconDesc'

export default defineMessages<ConfirmationModalMessage>({
  titleFallback: {
    defaultMessage: 'Você tem certeza que deseja fazer isso? Essa ação é irreversível',
    id: 'jvxLB+',
    description:
      'This text is used as a fallback to the confirmation modal title. It is displayed if the component did not received a custom message to display',
  },

  confirmationButtonFallback: {
    defaultMessage: 'Confirmar',
    id: 'Hfg9tY',
    description:
      'This text is used as a fallback to the confirmation modal confirm button. It is displayed if the component did not received a custom button label',
  },

  cancelButtonFallback: {
    defaultMessage: 'Cancelar',
    id: '0J4rjt',
    description:
      'This text is used as a fallback to the confirmation modal cancel button. It is displayed if the component did not received a custom button label',
  },

  iconDesc: {
    defaultMessage:
      'Um ícone de exclamação, alertando que se você confirmar a ação não poderá ser desfeita',
    id: 'Innace',
    description: 'This text is used by screen readers to explain the icon',
  },
})
