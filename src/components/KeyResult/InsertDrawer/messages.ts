import { defineMessages } from 'react-intl'

type KeyResultInsertDrawerMessage =
  | 'createTitle'
  | 'editTitle'
  | 'successToastMessage'
  | 'unexpectedErrorToastMessage'
  | 'validationErrorToastMessage'

export default defineMessages<KeyResultInsertDrawerMessage>({
  createTitle: {
    defaultMessage: 'Criar Resultado Chave',
    id: 'HEYvPI',
    description: 'This message appears as the title of the insert Key Result drawer',
  },
  editTitle: {
    defaultMessage: 'Resultado Chave',
    id: 'VWlRuQ',
    description: 'This message appears as the title of the insert Key Result drawer',
  },

  successToastMessage: {
    defaultMessage:
      'Resultado-chave {isEditing, select, true {editado} other {criado}} com sucesso!',
    id: 'Wf8no6',
    description: 'This message appears after the user creates a new key-result as a toast',
  },

  unexpectedErrorToastMessage: {
    defaultMessage: 'Desculpe, mas um erro inesperado aconteceu. Tente novamente mais tarde',
    id: '5fB6ei',
    description:
      'This message appears in an error toast after the user creates a new key-result but an unexpected error occurred',
  },

  validationErrorToastMessage: {
    defaultMessage: 'Preencha os campos obrigatórios para poder salvar este resultado-chave.',
    id: 'jCjr1X',
    description:
      'This message appears in an error toast after the users tries to create a key-result but there are some validation errors in the form',
  },
})
