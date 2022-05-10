import { defineMessages } from 'react-intl'

type myTasksMessages =
  | 'tasksEmptyStateHeader'
  | 'tasksEmptyStateMessage'
  | 'userTasksEmptyStateMessage'
  | 'createTaskLabel'

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

  userTasksEmptyStateMessage: {
    defaultMessage: '{username} ainda não tem nenhuma tarefa em seu nome nos OKRs da empresa.',
    id: 'VBdX86',
    description: 'The empty state message header when a user have no tasks',
  },

  createTaskLabel: {
    defaultMessage: 'Adicionar nova tarefa a este KR',
    id: 'LAEhNz',
    description: 'The label for create KR task button',
  },
})
