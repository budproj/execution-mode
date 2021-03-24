import { defineMessages } from 'react-intl'

type ResetButtonMessage = 'resetIconDesc' | 'label'

export default defineMessages<ResetButtonMessage>({
  resetIconDesc: {
    defaultMessage:
      'Uma seta em círculo, demonstrando que ao clicar aqui você redefinirá essa ação',
    id: '/SbmLm',
    description: 'This is the desc attribute of our reset icon. It is used by screen readers',
  },

  label: {
    defaultMessage: 'Redefinir',
    id: '6E9X3c',
    description: 'This is the button label that is displayed in our reset button',
  },
})
