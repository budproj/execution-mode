import { defineMessages } from 'react-intl'

type KeyResultsSectionTimelineCardBaseMessage =
  | 'treeDotsIconDesc'
  | 'removeMenuOption'
  | 'deleteDialogTitle'
  | 'cardTypeFallback'
  | 'unknownUser'

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

  deleteDialogTitle: {
    defaultMessage: 'Você tem certeza que deseja apagar este {type}?',
    id: '5llJzq',
    description:
      'This text is used in our delete modal confirmation to explain to the user what will happen',
  },

  cardTypeFallback: {
    defaultMessage: 'Registro',
    id: 'YUvWwS',
    description: 'It is used as a fallback if the component has no card type defined for it',
  },

  unknownUser: {
    defaultMessage: 'Usuário',
    id: '8kcr+g',
    description: 'This message is displayed as the user name whenever the user is not defined',
  },
})
