import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleOwnerMessages = 'label'

export default defineMessages({
  label: {
    defaultMessage: 'Responsável',
    id: 'isRqIz',
    description:
      'The label text above the owner selection input in our key result single page or drawer',
  },
}) as Record<KeyResultsSingleOwnerMessages, MessageDescriptor>
