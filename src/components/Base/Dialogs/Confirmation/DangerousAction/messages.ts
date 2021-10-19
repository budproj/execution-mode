import { defineMessages } from 'react-intl'

type DangerousActionConfirmationDialogMessages =
  | 'defaultSecondStageTitle'
  | 'defaultSecondStageDescription'

export default defineMessages<DangerousActionConfirmationDialogMessages>({
  defaultSecondStageTitle: {
    defaultMessage: 'Atenção! Essa ação não pode ser desfeita',
    id: '9iN0R8',
    description:
      'This message is used as the default message in our dangerous action confirmation modal',
  },

  defaultSecondStageDescription: {
    defaultMessage:
      'Se realmente tem certeza de que deseja fazer isso, confirme sua ação escrevendo "{keyword}” no campo abaixo:',
    id: 'gbO+eS',
    description:
      'This message is used as our default second stage description in our dangerous confirmation modal',
  },
})
