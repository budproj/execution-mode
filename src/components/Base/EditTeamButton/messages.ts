import { defineMessages } from 'react-intl'

type EmptyStateMessage = 'editTeamButtonIconDesc' | 'editTeamButtonTooltip'

export default defineMessages<EmptyStateMessage>({
  editTeamButtonTooltip: {
    defaultMessage: 'Editar time',
    id: 'YmUBcv',
    description: 'The tooltip on the gear icon that edits the team',
  },

  editTeamButtonIconDesc: {
    defaultMessage: 'Um desenho de uma engrenagem para o botão de edição de time',
    id: 'xPoUwI',
    description: 'The gear icon description',
  },
})
