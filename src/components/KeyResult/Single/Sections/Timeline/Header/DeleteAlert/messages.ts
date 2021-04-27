import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineDeleteAlertMessage = 'title' | 'description'

export default defineMessages<KeyResultsSectionTimelineDeleteAlertMessage>({
  title: {
    defaultMessage: 'Você excluiu um {type}',
    id: 'goSPM7',
    description:
      'This text is displayed as the alert title, explaining what resource the user removed',
  },

  description: {
    defaultMessage: 'Essa ação não pode ser desfeita',
    id: 'MAcjZG',
    description: 'This text is giving more details regarding the delete alert in our drawer',
  },
})
