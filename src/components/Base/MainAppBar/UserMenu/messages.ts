import { defineMessages } from 'react-intl'

type MainAppBarUserMenuMessage = 'firstOption' | 'secondOption' | 'thirdOption'

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

  thirdOption: {
    defaultMessage: 'Central dos buddies',
    id: 'yO19dV',
    description: 'MainAppBar user menu third item option',
  },
})
