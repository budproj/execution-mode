import { defineMessages } from 'react-intl'

type TaskOwnerSectionMessage = 'ownerLabel' | 'dueDateLabel' | 'editButtonLabel'

export default defineMessages<TaskOwnerSectionMessage>({
  ownerLabel: {
    defaultMessage: 'RESPONSÁVEL',
    id: 'WmoDcS',
    description: 'This message appears as a label for the task owner.',
  },
  dueDateLabel: {
    defaultMessage: 'PRAZO',
    id: 'R8PX0+',
    description: 'This message appears as a label for the due date.',
  },
  editButtonLabel: {
    defaultMessage: 'Editar',
    id: 'ykjrOr',
    description: 'This message appears as a label for the edit button.',
  },
})
