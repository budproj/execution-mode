import { defineMessages } from 'react-intl'

type SelectUserFromListMessage = 'searchPlaceholder' | 'iconDesc'

export default defineMessages<SelectUserFromListMessage>({
  searchPlaceholder: {
    defaultMessage: 'Procurar',
    id: 'GtgPfn',
    description:
      'The text is displayed as a placeholder in our search input inside the key-result drawers while the user is changing the owner of that key-result',
  },

  iconDesc: {
    defaultMessage: 'Um ícone de lupa, indicando que este é um campo de busca',
    id: 'kpJFIH',
    description:
      'This text is used by screen readers to explain the icon to the user. It is located in the key-result drawers, inside the edit owner component, as a description for the search icon',
  },
})
