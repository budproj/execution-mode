import { MessageDescriptor, defineMessages } from 'react-intl'

type CheckInFormMessages = 'save'

export default defineMessages({
  save: {
    defaultMessage: 'Salvar',
    id: 'FEd9u8',
    description: 'This message is displayed in the "SAVE" button in the checkin form',
  },
}) as Record<CheckInFormMessages, MessageDescriptor>
