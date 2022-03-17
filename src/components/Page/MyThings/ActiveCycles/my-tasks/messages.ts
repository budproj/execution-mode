import { defineMessages } from 'react-intl'

type myTasksMessages =
  | 'myTasksTitle'
  | 'newTag'
  | 'tasksEmptyStateHeader'
  | 'tasksEmptyStateMessage'

export default defineMessages<myTasksMessages>({
  myTasksTitle: {
    defaultMessage: 'Minhas Tarefas',
    id: '2leAvr',
    description: 'The header in my tasks title, inside my things page',
  },

  newTag: {
    defaultMessage: 'novo!',
    id: 'Gk28Al',
    description: 'Tag new item',
  },

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
