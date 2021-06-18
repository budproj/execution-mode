import { defineMessages } from 'react-intl'

type TeamActiveObjectivesMessages = 'emptyStateTitle' | 'emptyStateMessage'

export default defineMessages<TeamActiveObjectivesMessages>({
  emptyStateTitle: {
    defaultMessage: 'OKRs',
    id: '39q6ig',
    description:
      'This message is displayed above the empty state inside the active cycles section at the Team page',
  },

  emptyStateMessage: {
    defaultMessage: 'Este time não possui OKRs',
    id: 'R8hOYh',
    description: 'This message is displayed as the empty state message inside the team page',
  },
})
