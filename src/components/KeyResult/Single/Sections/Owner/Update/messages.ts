import { defineMessages } from 'react-intl'

type KeyResultsSectionOwnerUpdateMessage = 'searchPlaceholder' | 'iconDesc' | 'emptyState'

export default defineMessages<KeyResultsSectionOwnerUpdateMessage>({
  searchPlaceholder: {
    defaultMessage: 'Procurar',
    id: '32yCaj',
    description:
      'The text is displayed as a placeholder in our search input inside the key-result drawer while the user is changing the owner of that key-result',
  },

  iconDesc: {
    defaultMessage: 'Um ícone de lupa, indicando que este é um campo de busca',
    id: 'UfU6Si',
    description:
      'This text is used by screen readers to explain the icon to the user. It is located in the key-result drawer, inside the edit owner component, as a description for the search icon',
  },

  emptyState: {
    defaultMessage: 'Nenhuma pessoa encontrada',
    id: 'mQBvYY',
    description:
      'This message is displayed when the key-result drawer update owner option user list has no users to display. This usually happens when the user tries to search but there is no results',
  },
})
