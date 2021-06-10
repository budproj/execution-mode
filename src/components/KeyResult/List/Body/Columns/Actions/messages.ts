import { defineMessages } from 'react-intl'

type KeyResultListBodyColumnActionsMessage = 'deleteIconDesc' | 'deleteDialogType'

export default defineMessages<KeyResultListBodyColumnActionsMessage>({
  deleteIconDesc: {
    defaultMessage: 'Um ícone de lixeira. Ao clicar nele você irá remover este resultado-chave',
    id: 'BYO0eO',
    description:
      'This text is used by screen readers to explain our trash can icon, used to remove that line in the key-result table',
  },

  deleteDialogType: {
    defaultMessage: 'resultado-chave',
    id: 'h/WXZ6',
    description:
      'This message is used as the type to display in some of the delete dialogs while removing a given key-result',
  },
})
