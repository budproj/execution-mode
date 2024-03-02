import { defineMessages } from 'react-intl'

type TaskInsertDrawerMessage =
  | 'createTitle'
  | 'editTitle'
  | 'successToastMessage'
  | 'unexpectedErrorToastMessage'
  | 'validationErrorToastMessage'

export default defineMessages<TaskInsertDrawerMessage>({
  createTitle: {
    defaultMessage: 'Nova tarefa',
    id: 'uNo8rw',
    description: 'This message appears as the title of the insert Task drawer',
  },
  editTitle: {
    defaultMessage: 'Editar tarefa',
    id: 'L4PJe8',
    description:
      'This message appears as the title of the insert Task drawer when the task is editing',
  },

  successToastMessage: {
    defaultMessage: 'Tarefa {isEditing, select, true {editada} other {criada}} com sucesso!',
    id: 'MmRy3Z',
    description: 'This message appears after the user creates a new key-result as a toast',
  },

  unexpectedErrorToastMessage: {
    defaultMessage: 'Desculpe, mas um erro inesperado aconteceu. Tente novamente mais tarde',
    id: '5fB6ei',
    description:
      'This message appears in an error toast after the user creates a new key-result but an unexpected error occurred',
  },

  validationErrorToastMessage: {
    defaultMessage: 'Preencha os campos obrigatórios para poder salvar esta tarefa.',
    id: 'Ww9A1r',
    description:
      'This message appears in an error toast after the users tries to create a key-result but there are some validation errors in the form',
  },
})
