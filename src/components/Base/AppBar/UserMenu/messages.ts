import { defineMessages } from 'react-intl'

type AppBarUserMenuMessage = 'firstOption' | 'secondOption' | 'thirdOption'

export default defineMessages<AppBarUserMenuMessage>({
  firstOption: {
    defaultMessage: 'Minha conta',
    id: 'qmEcGQ',
    description: 'AppBar user menu first item option',
  },

  secondOption: {
    defaultMessage: 'Artigos de suporte',
    id: 'mBPu4P',
    description: 'AppBar user menu second item option',
  },

  thirdOption: {
    defaultMessage: 'Fale com nosso suporte técnico',
    id: 'h5uqwJ',
    description: 'AppBar user menu third item option',
  },
})
