import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardBaseMessage = 'treeDotsIconDesc' | 'removeMenuOption'

export default defineMessages<KeyResultsSectionTimelineCardBaseMessage>({
  treeDotsIconDesc: {
    defaultMessage: 'Um ícone com três pontos. Ao clicar nele você abrirá algumas opções',
    id: 'lI5vJI',
    description: 'This text is displayed as the tree dots desc text in our timeline cards',
  },

  removeMenuOption: {
    defaultMessage: 'Apagar',
    id: 'KdYFbe',
    description: 'This text is displayed in our menu, as an anchor to remove that given card',
  },
})
