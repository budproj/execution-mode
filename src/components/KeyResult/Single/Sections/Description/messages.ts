import { defineMessages } from 'react-intl'

type KeyResultsSectionDescriptionMessage = 'label' | 'emptyStateMessage'

export default defineMessages<KeyResultsSectionDescriptionMessage>({
  label: {
    defaultMessage: 'Descrição',
    id: '0OH4ZL',
    description:
      'The label text above the Description section in our key result single page or drawers',
  },

  emptyStateMessage: {
    defaultMessage: 'Insira uma descrição clicando aqui',
    id: 'MNn3/r',
    description:
      "This text is displayed as a placeholder for the description section of a key-result, only when that key-result don't have a description",
  },
})
