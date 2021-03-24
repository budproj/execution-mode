import { defineMessages } from 'react-intl'

type MainAppBarUserMenuMessage = 'firstOption' | 'secondOption' | 'thirdOption'

export default defineMessages<MainAppBarUserMenuMessage>({
  firstOption: {
    defaultMessage: 'Minha conta',
    id: 'Nwj8qY',
    description: 'MainAppBar user menu first item option',
  },

  secondOption: {
    defaultMessage: 'Artigos de suporte',
    id: 'yq7/PT',
    description: 'MainAppBar user menu second item option',
  },

  thirdOption: {
    defaultMessage: 'Fale com nosso suporte técnico',
    id: 'cPGOoL',
    description: 'MainAppBar user menu third item option',
  },
})
