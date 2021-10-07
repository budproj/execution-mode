import { defineMessages } from 'react-intl'

type BottomActionsMessages =
  | 'deactivateUserButtonLabel'
  | 'deactivateDialogTitle'
  | 'deactivatedConfirmationToast'

export default defineMessages<BottomActionsMessages>({
  deactivateUserButtonLabel: {
    defaultMessage: 'Desativar usuári{gender, select, MALE {o} FEMALE {a} other {o}}',
    id: 'BEo9Xi',
    description:
      'This text is used in our deactivate user button in the profile sidebar in our team page',
  },

  deactivateDialogTitle: {
    defaultMessage: 'Você tem certeza que deseja desativar esse usuário?',
    id: 'NzNAs4',
    description:
      'This text is used in our delete dialog confirmation to explain to the user what will happen',
  },

  deactivatedConfirmationToast: {
    defaultMessage: 'Você desativou {name} com sucesso',
    id: '0kNbEF',
    description: 'This message is used as a toast message when we finish deactivating a given user',
  },
})
