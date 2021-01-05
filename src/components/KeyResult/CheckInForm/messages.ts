import { MessageDescriptor, defineMessages } from 'react-intl'

type CheckInFormMessages = 'saveButtonLabel' | 'cancelButtonLabel'

export default defineMessages({
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
}) as Record<CheckInFormMessages, MessageDescriptor>
