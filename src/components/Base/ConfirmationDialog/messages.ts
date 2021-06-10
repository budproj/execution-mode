import { defineMessages } from 'react-intl'

type ConfirmationDialogMessage =
  | 'firstDialogTitle'
  | 'secondDialogTitle'
  | 'secondDialogDescription'
  | 'secondDialogInputLabel'
  | 'secondDialogPlaceholder'
  | 'dialogConfirmationButton'
  | 'dialogCancelButton'
  | 'defaultKeyword'

export default defineMessages<ConfirmationDialogMessage>({
  firstDialogTitle: {
    defaultMessage: 'Tem certeza que deseja excluir este {type}',
    id: 'vsM0eW',
    description:
      'This message is displayed as the title for the first confirmation modal while removing a given resource',
  },

  secondDialogTitle: {
    defaultMessage: 'Atenção! Esta ação não pode ser desfeita',
    id: 'UW67Oq',
    description:
      'This message is displayed as the title for the second confirmation modal while removing a given resource',
  },

  secondDialogDescription: {
    defaultMessage:
      'Se realmente tem certeza de que deseja excluir este {type}, confirme sua ação escrevendo “EXCLUIR” no campo abaixo:',
    id: 'nNymjR',
    description:
      'This message is displayed as the description for the second confirmation modal while removing a given resource',
  },

  secondDialogInputLabel: {
    defaultMessage: 'Confirme sua ação',
    id: 'tMTL/d',
    description:
      'This message is displayed as the input label for the second delete resource dialog',
  },

  secondDialogPlaceholder: {
    defaultMessage: 'Escreva {keyword} para confirmar a exclusão',
    id: '2q3pxG',
    description:
      'This message appears as a placeholder on the input in the second confirmation modal while deleting a given resource',
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
