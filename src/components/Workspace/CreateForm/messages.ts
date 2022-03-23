import { defineMessages } from 'react-intl'

type CreateFormMessage =
  | 'stepOneLabel'
  | 'stepTwoLabel'
  | 'stepThreeLabel'
  | 'backButtonLabel'
  | 'forwardButtonLabel'
  | 'submitButtonLabel'
  | 'successToastTitle'
  | 'errorToastTitle'

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

  submitButtonLabel: {
    defaultMessage: 'Enviar',
    id: 'LhZDKa',
    description: 'The label of the button used to submit a new workspace',
  },

  successToastTitle: {
    defaultMessage: 'Ambiente criado com sucesso',
    id: 'G/bGAZ',
    description: 'The title of the toast that appears when we create a new workspace',
  },

  errorToastTitle: {
    defaultMessage: 'Erro ao criar o ambiente',
    id: 'hFma0o',
    description:
      'The title of the toast that appears when we have an error while creating a new workspace',
  },
})
