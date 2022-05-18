import { defineMessages } from 'react-intl'

type TeamActiveObjectivesMessages =
  | 'emptyStateTitle'
  | 'emptyStateMessage'
  | 'draftObjectiveTitle'
  | 'draftObjectiveSuccessToastMessage'
  | 'draftObjectiveErrorToastMessage'

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

  draftObjectiveTitle: {
    defaultMessage: 'Novo objetivo',
    id: '6Syzud',
    description:
      'This message is used as the draft title of a new objective when an objective is created inside the team page',
  },

  draftObjectiveSuccessToastMessage: {
    defaultMessage: 'Um novo objetivo foi criado com sucesso',
    id: 'QRy8b9',
    description:
      'This message appears as a toast as soon as the the user clicks to add a new objective in the team page',
  },

  draftObjectiveErrorToastMessage: {
    defaultMessage: 'Houve um erro inesperado ao criar seu objetivo. Tente novamente mais tarde',
    id: 'i9bdpU',
    description:
      'This message appears as an error toast when the users tries to create a new objective but an error appears',
  },
})
