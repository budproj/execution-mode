import { defineMessages } from 'react-intl'

type CreateFormMessage =
  | 'stepOneLabel'
  | 'stepTwoLabel'
  | 'stepThreeLabel'
  | 'backButtonLabel'
  | 'forwardButtonLabel'

export default defineMessages<CreateFormMessage>({
  stepOneLabel: {
    defaultMessage: 'Passo 1',
    id: 'UZnhGI',
    description: 'The label of the first step while creating a new workspace',
  },
  stepTwoLabel: {
    defaultMessage: 'Passo 2',
    id: 'XN0ZEi',
    description: 'The label of the second step while creating a new workspace',
  },
  stepThreeLabel: {
    defaultMessage: 'Passo 3',
    id: 'DWCNAb',
    description: 'The label of the third step while creating a new workspace',
  },
  backButtonLabel: {
    defaultMessage: 'Anterior',
    id: 'hMD8CO',
    description: 'The label of the button used to go back while creating a new workspace',
  },
  forwardButtonLabel: {
    defaultMessage: 'Próximo',
    id: 'hdWCC9',
    description: 'The label of the button used to go forward while creating a new workspace',
  },
})
