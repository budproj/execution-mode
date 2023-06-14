import { defineMessages } from 'react-intl'

type CreateObjectiveWorkflowMessages =
  | 'goBackButton'
  | 'nextStepButton'
  | 'objectiveCreatedToastTitle'

export default defineMessages<CreateObjectiveWorkflowMessages>({
  goBackButton: {
    defaultMessage: 'Voltar',
    id: 'QjDvOT',
    description:
      'This message appears on the back to previous step button in the workflow for creating or editing an objective.',
  },

  nextStepButton: {
    defaultMessage: '{mode, select, FILLED {Criar objetivo} other {Avançar}}',
    id: 'LBZ+5U',
    description:
      ' This message appears on the button to move to the next step in the workflow for creating or editing an objective.',
  },

  objectiveCreatedToastTitle: {
    defaultMessage: 'Agora seu objetivo está em modo rascunho!',
    id: '0nY7VZ',
    description: 'This message appears in a toast when a objective is created.',
  },
})
