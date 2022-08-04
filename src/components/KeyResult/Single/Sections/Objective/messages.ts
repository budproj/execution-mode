import { defineMessages } from 'react-intl'

type KeyResultsSectionObjectiveMessage =
  | 'label'
  | 'stackIconDesc'
  | 'teamOkrTooltipMessage'
  | 'individualOkrTooltipMessage'

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

  teamOkrTooltipMessage: {
    defaultMessage: 'Explore este objetivo completo no time de {team}',
    id: 'x24wfc',
    description: 'This message appears in the objective tooltip',
  },

  individualOkrTooltipMessage: {
    defaultMessage: 'Explore este objetivo completo no Plano Individual de {user}',
    id: 'piM/9+',
    description: 'This message appears in the individual objective tooltip',
  },
})
