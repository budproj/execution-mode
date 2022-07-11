import { defineMessages } from 'react-intl'

type BottomActionsMessages =
  | 'deactivateUserButtonLabel'
  | 'deactivateDialogTitle'
  | 'deactivateDialogDescription'
  | 'deactivateDialogKeyword'
  | 'deactivatedConfirmationToast'

export default defineMessages<BottomActionsMessages>({
  deactivateUserButtonLabel: {
    defaultMessage: 'Desativar usuári{gender, select, MALE {o} FEMALE {a} other {o}}',
    id: 'BEo9Xi',
    description:
      'This text is used in our deactivate user button in the profile sidebar in our team page',
  },

  deactivateDialogTitle: {
    defaultMessage:
      'Tem certeza que deseja desativar {gender, select, MALE {o} FEMALE {a} other {o}} usuári{gender, select, MALE {o} FEMALE {a} other {o}} {name}?',
    id: '30/f+o',
    description:
      'This text is used in our delete dialog confirmation to explain to the user what will happen',
  },

  deactivateDialogDescription: {
    defaultMessage:
      '{name} perderá o acesso ao Bud e será removido dos times aos quais pertence, mas manteremos o histórico de check-ins e comentários feitos até aqui.',
    id: 'H/tYPn',
    description:
      'This message appears in the confirmation dialog when we try to deactivate an user.',
  },

  deactivateDialogKeyword: {
    defaultMessage: 'DESATIVAR',
    id: 'HhSnBG',
    description: 'This is the keyword that the user needs to type to deactivate a given user',
  },

  deactivatedConfirmationToast: {
    defaultMessage: 'Você desativou {name} com sucesso',
    id: '0kNbEF',
    description: 'This message is used as a toast message when we finish deactivating a given user',
  },
})
