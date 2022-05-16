import { defineMessages } from 'react-intl'

type myPersonalTasksMessages =
  | 'personalTasksHeading'
  | 'addPersonalTasksButtonLabel'
  | 'personalTasksTooltip'
  | 'newTag'
  | 'emptyTitle'
  | 'emptySubTitle'

export default defineMessages<myPersonalTasksMessages>({
  personalTasksHeading: {
    defaultMessage: 'Minhas Tarefas Pessoais',
    id: 'hXlVqV',
    description: 'The heading for the personal tasks section',
  },
  addPersonalTasksButtonLabel: {
    defaultMessage: 'Adicionar nova tarefa pessoal',
    id: 'qsn7TW',
    description: 'The add new personal task button label',
  },
  personalTasksTooltip: {
    defaultMessage:
      'Estas tarefas não estão relacionadas diretamente a um resultado-chave. Use-as para organizar melhor seu dia e deixá-lo mais produtivo :)',
    id: 'iLO8sl',
    description: 'The tooltip that shows when hovering over the personal tasks accordion title',
  },
  newTag: {
    defaultMessage: 'novo!',
    id: 'Gk28Al',
    description: 'Tag new item',
  },
  emptyTitle: {
    defaultMessage: 'Vamos criar uma tarefa pessoal?',
    id: '97e4V+',
    description: 'Personal tasks empty state title',
  },
  emptySubTitle: {
    defaultMessage:
      'Experimente usar esse espaço para listar suas prioridades do dia, por exemplo :)',
    id: 'WEXvlm',
    description: 'Personal tasks empty state sub title',
  },
})
