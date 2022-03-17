import { defineMessages } from 'react-intl'

type SwitcherMessage = 'firstTab' | 'secondTab'

export default defineMessages<SwitcherMessage>({
  firstTab: {
    defaultMessage: 'Ciclos ativos',
    id: 'mdG+CG',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },

  secondTab: {
    defaultMessage: 'Explorar ciclos anteriores',
    id: 'JBA9+L',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },
})
