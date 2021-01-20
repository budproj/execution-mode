import { defineMessages } from 'react-intl'

type KeyResultsSectionCommentsMessage = 'label' | 'emptyStateLabel'

export default defineMessages<KeyResultsSectionCommentsMessage>({
  label: {
    defaultMessage: 'Comentários',
    id: 'lQs6US',
    description:
      'The label text above the Comments section in our key result single page or drawer',
  },

  emptyStateLabel: {
    defaultMessage: 'Esse resultado-chave não tem nenhum comentário',
    id: 'oeB7dG',
    description:
      'The label message that is displayed below our team at work image in our empty state',
  },
})
