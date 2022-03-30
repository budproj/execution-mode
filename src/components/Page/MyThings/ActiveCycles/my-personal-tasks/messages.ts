import { defineMessages } from 'react-intl'

type myPersonalTasksMessages = 'personalTasksHeading' | 'addPersonalTasksButtonLabel'

export default defineMessages<myPersonalTasksMessages>({
  personalTasksHeading: {
    defaultMessage: 'Minhas Tarefas Pessoais',
    id: 'hXlVqV',
    description: 'The heading for the personal tasks section',
  },
  addPersonalTasksButtonLabel: {
    defaultMessage: 'Adicionar nova tarefa',
    id: 'FZVBXg',
    description: 'The add new personal task button label',
  },
})
