import { defineMessages } from 'react-intl'

type AppBarUserMenuMessage = 'firstOption' | 'secondOption'

export default defineMessages<AppBarUserMenuMessage>({
  firstOption: {
    defaultMessage: 'Meu perfil',
    id: '1xEL8L',
    description: 'AppBar user menu first item option',
  },

  secondOption: {
    defaultMessage: 'Suporte',
    id: 'ejsLdS',
    description: 'AppBar user menu second item option',
  },
})
