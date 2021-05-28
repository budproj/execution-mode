import { defineMessages } from 'react-intl'

type KeyResultsSectionCycleMessage = 'primaryLabel' | 'startLabel' | 'endLabel' | 'nameLabel'

export default defineMessages<KeyResultsSectionCycleMessage>({
  primaryLabel: {
    defaultMessage: 'Ciclo',
    id: 'HQfOOa',
    description: 'The label text above the Cycle section in our key result single page or drawers',
  },

  startLabel: {
    defaultMessage: 'Início',
    id: 'BydeYi',
    description:
      'The label text inside the Cycle section, above the start date in our key result single page or drawers',
  },

  endLabel: {
    defaultMessage: 'Fim',
    id: 'eUCb55',
    description:
      'The label text inside the Cycle section, above the end date in our key result single page or drawers',
  },

  nameLabel: {
    defaultMessage: 'Período',
    id: 'VNHZWm',
    description:
      'The name label. It is displayed in the Cycle section, as a label of the name property',
  },
})
