import { defineMessages } from 'react-intl'

type myTasksMessages = 'tasksEmptyStateHeader' | 'tasksEmptyStateMessage'

export default defineMessages<myTasksMessages>({
  tasksEmptyStateHeader: {
    defaultMessage: 'Você ainda não tem nenhuma tarefa.',
    id: 'WR43/0',
    description: 'The empty state message header when you have no tasks',
  },

  tasksEmptyStateMessage: {
    defaultMessage: 'Crie novas tarefas pela barra lateral dos resultados-chave em que você atua.',
    id: 'J5Rfuu',
    description: 'The empty state message when you have no tasks',
  },
})
