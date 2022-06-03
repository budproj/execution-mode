import { defineMessages } from 'react-intl'

type CyclesListBodyColumnActionsMessage =
  | 'deleteDialogKeyword'
  | 'deleteDialogFirstStageTitle'
  | 'deleteDialogSecondStageTitle'
  | 'deleteDialogConfirmationLabel'
  | 'deleteDialogFirstStageDescription'
  | 'deleteDialogSecondStageDescription'
  | 'deleteSuccessToastMessage'
  | 'deleteErrorToastMessage'
  | 'optionsButtonDesc'
  | 'firstMenuItemOption'
  | 'secondMenuItemOption'
  | 'deleteCycleSuccessToastMessage'

export default defineMessages<CyclesListBodyColumnActionsMessage>({
  deleteDialogKeyword: {
    defaultMessage: 'EXCLUIR',
    id: 'uUn4LH',
    description: 'This message is used as keyword to delete a cycle',
  },

  deleteDialogFirstStageTitle: {
    defaultMessage: 'Tem certeza que deseja excluir o ciclo {period}?',
    id: 'mbJq/U',
    description: 'This message is used as the title in our first dialog while removing a cycle',
  },

  deleteDialogSecondStageTitle: {
    defaultMessage: 'Atenção!{breakline}Esta ação não pode ser desfeita.',
    id: 'az3ncM',
    description: 'This message is used as the title in our second dialog while removing a cycle',
  },

  deleteDialogFirstStageDescription: {
    defaultMessage:
      'Isso também excluirá todos os OKRs criados neste ciclo. Essa ação não pode ser desfeita.',
    id: 'BeFobb',
    description:
      'This message is used as the description in our first dialog while removing a cycle',
  },

  deleteDialogSecondStageDescription: {
    defaultMessage:
      'Se realmente tem certeza de que deseja excluir o ciclo {period} e todos os seus OKRs, confirme sua ação escrevendo “EXCLUIR” no campo abaixo:',
    id: 'KDE9dq',
    description:
      'This message is used as the description in our  second dialog while removing a cycle',
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

  deleteCycleSuccessToastMessage: {
    defaultMessage: 'Ciclo {period} excluído com sucesso.',
    id: 'J0sAff',
    description: 'This message appears in a toast after the user removes an cycle.',
  },
})
