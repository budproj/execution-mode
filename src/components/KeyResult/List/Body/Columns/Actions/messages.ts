import { defineMessages } from 'react-intl'

type KeyResultListBodyColumnActionsMessage =
  | 'deleteIconDesc'
  | 'deleteDialogType'
  | 'deleteFirstDialogDescription'
  | 'deleteSuccessToastMessage'
  | 'deleteErrorToastMessage'

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

  deleteFirstDialogDescription: {
    defaultMessage: 'Você perderá todos os check-ins e comentários feitos até aqui.',
    id: 'FRO0CY',
    description:
      'This message is used as the description in our first dialog while removing a key-result',
  },

  deleteSuccessToastMessage: {
    defaultMessage: 'O resultado-chave foi removido com sucesso',
    id: '0R+aEr',
    description: 'This message appears in a toast after the user removes a key-result',
  },

  deleteErrorToastMessage: {
    defaultMessage: 'Desculpe, mas houve um erro inesperado. Tente novamente mais tarde',
    id: 'cRj0sI',
    description:
      'This message appears when the user tries to remove a given key-result, but receives an error',
  },
})
