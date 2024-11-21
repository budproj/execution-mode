import { defineMessages } from 'react-intl'

type KeyResultListBodyColumnActionsMessage =
  | 'deleteIconDesc'
  | 'deleteDialogKeyword'
  | 'deleteDialogFirstStageTitle'
  | 'deleteDialogFirstStageDescription'
  | 'deleteDialogConfirmationLabel'
  | 'deleteSuccessToastMessage'
  | 'deleteErrorToastMessage'
  | 'deleteButtonMessage'
  | 'successfulCopyMessage'
  | 'copyButtonMessage'
  | 'optionsButtonDesc'
  | 'editButtonLabelMessage'

export default defineMessages<KeyResultListBodyColumnActionsMessage>({
  deleteIconDesc: {
    defaultMessage: 'Um ícone de lixeira. Ao clicar nele você irá remover este resultado-chave',
    id: 'BYO0eO',
    description:
      'This text is used by screen readers to explain our trash can icon, used to remove that line in the key-result table',
  },

  deleteDialogKeyword: {
    defaultMessage: 'EXCLUIR',
    id: 'RwKPpx',
    description: 'This message is used as keyword to delete a key-result',
  },

  deleteDialogFirstStageTitle: {
    defaultMessage: 'Tem certeza que deseja excluir este resultado-chave?',
    id: 'E+0+QH',
    description:
      'This message is used as the title in our first dialog while removing a key-result',
  },

  deleteDialogFirstStageDescription: {
    defaultMessage: 'Você perderá todos os check-ins e comentários feitos até aqui.',
    id: 'FRO0CY',
    description:
      'This message is used as the description in our first dialog while removing a key-result',
  },

  deleteDialogConfirmationLabel: {
    defaultMessage: 'Excluir resultado-chave',
    id: 'VHOea1',
    description:
      'This message is used as the label in the confirmation button while removing a key-result',
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
  deleteButtonMessage: {
    defaultMessage: 'Excluir este Resultado-Chave',
    id: 'IsUZSc',
    description: 'This message appears in the button that deletes the key result',
  },
  copyButtonMessage: {
    defaultMessage: 'Copiar título deste Resultado-Chave',
    id: 'AO/RyT',
    description: 'This message appears in the button that copies the title of the key result',
  },
  successfulCopyMessage: {
    defaultMessage: 'Título copiado com sucesso.',
    id: 'VFj8OD',
    description:
      'This message appears in the toast when you successfully copies the title of the key result',
  },
  optionsButtonDesc: {
    defaultMessage: 'Botão de opções',
    id: 'XCDzMo',
    description:
      'This button allows you to choose an option that can allow you to copy the title ou exclude the KR.',
  },
  editButtonLabelMessage: {
    defaultMessage: 'Editar este Resultado-Chave',
    id: 'r2E/o2',
    description: 'This button allow the user edit the Key Result.',
  },
})
