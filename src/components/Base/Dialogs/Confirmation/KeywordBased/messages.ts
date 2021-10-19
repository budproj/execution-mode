import { defineMessages } from 'react-intl'

type KeywordBasedConfirmationMessages = 'inputLabel' | 'inputPlaceholder'

export default defineMessages<KeywordBasedConfirmationMessages>({
  inputLabel: {
    defaultMessage: 'Confirmação de segurança',
    id: 'GzrbYC',
    description:
      'This message is displayed as the input label for the danger confirmation resource dialog',
  },

  inputPlaceholder: {
    defaultMessage: 'Escreva {keyword} para confirmar sua ação',
    id: 'IU2bu6',
    description:
      'This message appears as a placeholder on the input in the danger confirmation modal while deleting a given resource',
  },
})
