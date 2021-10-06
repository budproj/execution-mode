import { defineMessages } from 'react-intl'

type BottomActionsMessages = 'deactivateUserButtonLabel'

export default defineMessages<BottomActionsMessages>({
  deactivateUserButtonLabel: {
    defaultMessage: 'Desativar usuári{gender, select, MALE {o} FEMALE {a} other {o}}',
    id: 'BEo9Xi',
    description:
      'This text is used in our deactivate user button in the profile sidebar in our team page',
  },
})
