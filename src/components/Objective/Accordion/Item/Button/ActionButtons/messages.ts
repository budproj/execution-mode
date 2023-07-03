import { defineMessages } from 'react-intl'

type ActionButtons = 'cancelButton' | 'submitButton'

export default defineMessages<ActionButtons>({
  cancelButton: {
    defaultMessage: 'Cancelar',
    id: 'e24rnu',
    description: 'Cancel button title',
  },
  submitButton: {
    defaultMessage: '{mode, select, DRAFT {Avançar} other {Concluir}}',
    id: 'XtA5dv',
    description: 'Submit button title',
  },
})
