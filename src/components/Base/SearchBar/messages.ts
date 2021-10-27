import { defineMessages } from 'react-intl'

type SearchMessage = 'defaultSearchPlaceholder' | 'iconDesc'

export default defineMessages<SearchMessage>({
  defaultSearchPlaceholder: {
    defaultMessage: 'Procurar',
    id: 'FoCix/',
    description: 'The text is displayed as the default placeholder for all our search inputs',
  },

  iconDesc: {
    defaultMessage: 'Um ícone de lupa, indicando que este é um campo de busca',
    id: 'biDODR',
    description:
      'This text is used by screen readers to explain the search icon in all our search inputs',
  },
})
