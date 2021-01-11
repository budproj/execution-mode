import { defineMessages } from 'react-intl'

type KeyResultsSingleCycleMessage = 'primaryLabel' | 'startLabel' | 'endLabel' | 'nameLabel'

export default defineMessages<KeyResultsSingleCycleMessage>({
  primaryLabel: {
    defaultMessage: 'Ciclo',
    id: 'z1FXkV',
    description: 'The label text above the Cycle section in our key result single page or drawer',
  },

  startLabel: {
    defaultMessage: 'Início',
    id: 'aiRCwP',
    description:
      'The label text inside the Cycle section, above the start date in our key result single page or drawer',
  },

  endLabel: {
    defaultMessage: 'Fim',
    id: 'fZZOsX',
    description:
      'The label text inside the Cycle section, above the end date in our key result single page or drawer',
  },

  nameLabel: {
    defaultMessage: 'Período',
    id: 'VNHZWm',
    description:
      'The name label. It is displayed in the Cycle section, as a label of the name property',
  },
})
