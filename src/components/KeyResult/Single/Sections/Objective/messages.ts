import { defineMessages } from 'react-intl'

type KeyResultsSectionObjectiveMessage = 'label' | 'stackIconDesc' | 'tooltipMessage'

export default defineMessages<KeyResultsSectionObjectiveMessage>({
  label: {
    defaultMessage: 'Pertence ao objetivo',
    id: 'ssM7Lj',
    description:
      'The label text above the Objective section in our key result single page or drawers',
  },

  stackIconDesc: {
    defaultMessage: 'Um ícone de com diversas superfícies, uma em cima da outra',
    id: 'UBruoq',
    description: 'The alternative text explaining our stack icon',
  },

  tooltipMessage: {
    defaultMessage: 'Explore este objetivo completo no time de {team}',
    id: 'x24wfc',
    description: 'This message appears in the objective tooltip',
  },
})
