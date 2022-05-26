import { defineMessages } from 'react-intl'

type CyclesListBodyColumnActionsMessage =
  | 'deleteDialogKeyword'
  | 'deleteDialogFirstStageTitle'
  | 'deleteDialogConfirmationLabel'
  | 'deleteSuccessToastMessage'
  | 'deleteErrorToastMessage'
  | 'optionsButtonDesc'
  | 'firstMenuItemOption'
  | 'secondMenuItemOption'

export default defineMessages<CyclesListBodyColumnActionsMessage>({
  deleteDialogKeyword: {
    defaultMessage: 'EXCLUIR',
    id: 'uUn4LH',
    description: 'This message is used as keyword to delete a cycle',
  },

  deleteDialogFirstStageTitle: {
    defaultMessage: 'Tem certeza que deseja excluir este ciclo?',
    id: '+9u2ZP',
    description: 'This message is used as the title in our first dialog while removing a cycle',
  },

  deleteDialogConfirmationLabel: {
    defaultMessage: 'Excluir ciclo',
    id: 'jV4VhD',
    description:
      'This message is used as the label in the confirmation button while removing a cycle',
  },

  deleteSuccessToastMessage: {
    defaultMessage: 'O ciclo foi removido com sucesso',
    id: 'XyhQJo',
    description: 'This message appears in a toast after the user removes a cycle',
  },

  deleteErrorToastMessage: {
    defaultMessage: 'Desculpe, mas houve um erro inesperado. Tente novamente mais tarde',
    id: 'xJJ9uE',
    description:
      'This message appears when the user tries to remove a given cycle, but receives an error',
  },

  optionsButtonDesc: {
    defaultMessage: 'Desculpe, mas houve um erro inesperado. Tente novamente mais tarde',
    id: 'xJJ9uE',
    description:
      'This message appears when the user tries to remove a given cycle, but receives an error',
  },

  firstMenuItemOption: {
    defaultMessage: 'Editar ciclo',
    id: 'bPInC0',
    description: 'This message is the description of the edit cycle option.',
  },

  secondMenuItemOption: {
    defaultMessage: 'Excluir ciclo',
    id: 'zcIxrk',
    description: 'This message is the description of the option to delete a cycle.',
  },
})
