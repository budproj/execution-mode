import { defineMessages } from 'react-intl'

type TaskCardMessages = 'doneTask' | 'deleteButtonAction'

export default defineMessages<TaskCardMessages>({
  doneTask: {
    defaultMessage: 'Tarefa feita',
    id: 'uM5lpV',
    description: 'The text that appears when the task is done.',
  },

  deleteButtonAction: {
    defaultMessage: 'Excluir',
    id: 'WOYUb/',
    description: 'The text that appears when the task is done.',
  },
})
