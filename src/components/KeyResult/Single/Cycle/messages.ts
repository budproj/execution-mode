import { MessageDescriptor, defineMessages } from 'react-intl'

type KeyResultsSingleCycleMessages = 'primaryLabel' | 'createdAtLabel' | 'startLabel' | 'endLabel'

export default defineMessages({
  primaryLabel: {
    defaultMessage: 'Duração',
    id: '2qxo81',
    description: 'The label text above the Cycle section in our key result single page or drawer',
  },

  createdAtLabel: {
    defaultMessage: 'Criado em',
    id: 'M44zCJ',
    description:
      'The label text inside the Cycle section, above the creation date in our key result single page or drawer',
  },

  startLabel: {
    defaultMessage: 'Data de início',
    id: 'dOaMzr',
    description:
      'The label text inside the Cycle section, above the start date in our key result single page or drawer',
  },

  endLabel: {
    defaultMessage: 'Data de fim',
    id: 'y6z1c3',
    description:
      'The label text inside the Cycle section, above the end date in our key result single page or drawer',
  },
}) as Record<KeyResultsSingleCycleMessages, MessageDescriptor>
