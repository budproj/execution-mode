import { defineMessages } from 'react-intl'

type myPersonalTasksMessages =
  | 'personalTasksHeading'
  | 'addPersonalTasksButtonLabel'
  | 'personalTasksTooltip'

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
  personalTasksTooltip: {
    defaultMessage:
      'Estas tarefas não estão relacionadas diretamente a um resultado-chave. Use-as para organizar melhor seu dia e deixá-lo mais produtivo :)',
    id: 'iLO8sl',
    description: 'The tooltip that shows when hovering over the personal tasks accordion title',
  },
})
