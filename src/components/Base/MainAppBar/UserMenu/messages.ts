import { defineMessages } from 'react-intl'

type MainAppBarUserMenuMessage = 'firstOption' | 'secondOption'

export default defineMessages<MainAppBarUserMenuMessage>({
  firstOption: {
    defaultMessage: 'Minha conta',
    id: 'Nwj8qY',
    description: 'MainAppBar user menu first item option',
  },

  secondOption: {
    defaultMessage: 'Central de ajuda',
    id: '0N9lO8',
    description: 'MainAppBar user menu second item option',
  },
})
