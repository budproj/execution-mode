import { defineMessages } from 'react-intl'

type MainAppBarUserMenuMessage = 'firstOption' | 'secondOption'

export default defineMessages<MainAppBarUserMenuMessage>({
  firstOption: {
    defaultMessage: 'Meu perfil',
    id: 'TN6PhK',
    description: 'MainAppBar user menu first item option',
  },

  secondOption: {
    defaultMessage: 'Central de ajuda',
    id: '0N9lO8',
    description: 'MainAppBar user menu second item option',
  },
})
