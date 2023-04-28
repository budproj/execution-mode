import { defineMessages } from 'react-intl'

type ActionButtons = 'cancelButton' | 'submitButton'

export default defineMessages<ActionButtons>({
  cancelButton: {
    defaultMessage: 'Cancelar',
    id: 'e24rnu',
    description: 'Cancel button title',
  },
  submitButton: {
    defaultMessage: 'Avançar',
    id: 'O3rfs0',
    description: 'Submit button title',
  },
})
