import { MessageDescriptor, defineMessages } from 'react-intl'

type StatusCellMessages = 'updatedAt'

export default defineMessages({
  updatedAt: {
    defaultMessage: 'Atualização de status',
    id: 'yQ7cY8',
    description:
      'We show this prefix before the updated time of the status column in our Key Results table',
  },
}) as Record<StatusCellMessages, MessageDescriptor>
