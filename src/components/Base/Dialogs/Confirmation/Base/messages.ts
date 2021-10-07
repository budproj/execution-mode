import { defineMessages } from 'react-intl'

type ConfirmationDialogMessage =
  | 'confirmationDialogTitle'
  | 'dangerDialogTitle'
  | 'dangerDialogDescription'
  | 'dangerDialogInputLabel'
  | 'dangerDialogPlaceholder'
  | 'dialogConfirmationButton'
  | 'dialogCancelButton'
  | 'defaultKeyword'

export default defineMessages<ConfirmationDialogMessage>({
  confirmationDialogTitle: {
    defaultMessage: 'Tem certeza que deseja excluir este {type}?',
    id: 'zQoORA',
    description:
      'This message is displayed as the title for the confirmation modal while removing a given resource',
  },

  dangerDialogTitle: {
    defaultMessage: 'Atenção! Esta ação não pode ser desfeita',
    id: 'xwbI5E',
    description:
      'This message is displayed as the title for the danger confirmation modal while removing a given resource',
  },

  dangerDialogDescription: {
    defaultMessage:
      'Se realmente tem certeza de que deseja excluir este {type}, confirme sua ação escrevendo “EXCLUIR” no campo abaixo:',
    id: 'hzOI/d',
    description:
      'This message is displayed as the description for the danger confirmation modal while removing a given resource',
  },

  dangerDialogInputLabel: {
    defaultMessage: 'Confirme sua ação',
    id: 'aT1RWB',
    description:
      'This message is displayed as the input label for the danger delete resource dialog',
  },

  dangerDialogPlaceholder: {
    defaultMessage: 'Escreva {keyword} para confirmar a exclusão',
    id: '9lxU9H',
    description:
      'This message appears as a placeholder on the input in the danger confirmation modal while deleting a given resource',
  },

  dialogConfirmationButton: {
    defaultMessage: 'Excluir {type}',
    id: 'Afdu+X',
    description: 'This message appears as a button label on the delete confirmation button',
  },

  dialogCancelButton: {
    defaultMessage: 'Cancelar',
    id: 'WkRV5L',
    description:
      'This message appears as a cancel button in the modal while deleting a given resource',
  },

  defaultKeyword: {
    defaultMessage: 'EXCLUIR',
    id: 'UN5BY2',
    description:
      'This message is used as the default keyword to type to confirm while removing a given resource',
  },
})
