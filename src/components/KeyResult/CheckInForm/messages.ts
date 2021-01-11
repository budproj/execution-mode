import { defineMessages } from 'react-intl'

type CheckInFormMessage = 'saveButtonLabel' | 'cancelButtonLabel'

export default defineMessages<CheckInFormMessage>({
  saveButtonLabel: {
    defaultMessage: 'Salvar',
    id: 'FEd9u8',
    description: 'This message is displayed in the "SAVE" button in the checkin form',
  },

  cancelButtonLabel: {
    defaultMessage: 'Cancelar',
    id: 'kawRcN',
    description: 'This message is displayed in the "CANCEL" button in the checkin form',
  },
})
