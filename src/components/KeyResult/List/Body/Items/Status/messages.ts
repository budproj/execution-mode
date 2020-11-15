import { MessageDescriptor, defineMessages } from 'react-intl'

type StatusCellMessages =
  | 'upToDate'
  | 'atRisk'
  | 'overdue'
  | 'updatedAt'
  | 'descUpToDate'
  | 'descAtRisk'
  | 'descOverdue'

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

  descUpToDate: {
    defaultMessage: 'Um círculo verde, indicando que o resultado-chave está em dia',
    id: 'LytmoI',
    description: 'A brief explanation for screen readers regarding the green status circle',
  },

  descAtRisk: {
    defaultMessage: 'Um círculo amarelo, indicando que o resultado-chave está em risco',
    id: 'A3RqIa',
    description: 'A brief explanation for screen readers regarding the yellow status circle',
  },

  descOverdue: {
    defaultMessage: 'Um círculo vermelho, indicando que o resultado-chave está atrasada',
    id: 'JuRKh+',
    description: 'A brief explanation for screen readers regarding the red status circle',
  },
}) as Record<StatusCellMessages, MessageDescriptor>
