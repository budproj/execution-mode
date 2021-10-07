import { defineMessages } from 'react-intl'

type ConfirmationDialogMessages = 'defaultConfirmationLabel' | 'defaultCancelationLabel'

export default defineMessages<ConfirmationDialogMessages>({
  defaultConfirmationLabel: {
    defaultMessage: 'Confirmar',
    id: 't0YKyV',
    description:
      'This message is used as the confirmation button when we are in the confirmation dialog',
  },

  defaultCancelationLabel: {
    defaultMessage: 'Cancelar',
    id: '8CjDR7',
    description: 'This message is used in the cancel button when we are in the confirmation dialog',
  },
})
