import { MessageDescriptor, defineMessages } from 'react-intl'

type StatusCellMessages = 'upToDate' | 'atRisk' | 'overdue' | 'updatedAt'

export default defineMessages({
  upToDate: {
    defaultMessage: 'Em dia',
    id: 'J98VQ8',
    description: 'We use this tag to group every key result with confidence higher than 50',
  },

  atRisk: {
    defaultMessage: 'Em risco',
    id: 'AobZDF',
    description:
      'We use this tag to group every key result with confidence higher than 25 but lower than 50',
  },

  overdue: {
    defaultMessage: 'Em atraso',
    id: '8bQS0s',
    description: 'We use this tag to group every key result with confidence lower than 25',
  },

  updatedAt: {
    defaultMessage: 'Atualização de status',
    id: 'yQ7cY8',
    description:
      'We show this prefix before the updated time of the status column in our Key Results table',
  },
}) as Record<StatusCellMessages, MessageDescriptor>
