import { defineMessages } from 'react-intl'

type CreateObjectiveWorkflowMessages = 'goBackButton' | 'nextStepButton'

export default defineMessages<CreateObjectiveWorkflowMessages>({
  goBackButton: {
    defaultMessage: 'Voltar',
    id: 'QjDvOT',
    description:
      'This message appears on the back to previous step button in the workflow for creating or editing an objective.',
  },

  nextStepButton: {
    defaultMessage: 'Avançar',
    id: 'aX4jaB',
    description:
      ' This message appears on the button to move to the next step in the workflow for creating or editing an objective.',
  },
})
