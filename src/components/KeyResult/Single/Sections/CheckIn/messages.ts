import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleCheckInMessages = 'label'

export default defineMessages({
  label: {
    defaultMessage: 'Check-in',
    id: 'u/NI1D',
    description:
      'The label text above the check-in section in our key result single page or drawer',
  },
}) as Record<KeyResultsSingleCheckInMessages, MessageDescriptor>
