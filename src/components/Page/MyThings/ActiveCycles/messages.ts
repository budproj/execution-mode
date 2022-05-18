import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'pageTitle'
  | 'pageSubTitle'
  | 'metaTitle'
  | 'metaDescription'
  | 'firstTab'
  | 'secondTab'
  | 'myTasksTitle'
  | 'pendingTasks'
  | 'allTasks'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  pageTitle: {
    defaultMessage: 'Minhas Coisas',
    id: 'eVkwyH',
    description: 'The page title that our users should see in the my things page',
  },

  pageSubTitle: {
    defaultMessage: 'Estes são os resultados-chave e as tarefas atribuídos a você.',
    id: 'W3eJuC',
    description: 'The page sub title that our users should see in the my things page',
  },

  metaTitle: {
    defaultMessage: 'Minhas Coisas | bud ',
    id: 'p2UjMZ',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize seus resultados-chave e seus detalhes, atualize seu progresso e seu nível de confiança.',
    id: 'AII0ao',
    description: 'The page description that is displayed in Google and screen readers',
  },

  firstTab: {
    defaultMessage: 'Ciclos ativos',
    id: 'mdG+CG',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },

  secondTab: {
    defaultMessage: 'Explorar ciclos anteriores',
    id: 'JBA9+L',
    description:
      'This text is displayed as a tab where the user can click to change the view below it',
  },

  myTasksTitle: {
    defaultMessage: 'Minhas Tarefas',
    id: '2leAvr',
    description: 'The header in my tasks title, inside my things page',
  },

  pendingTasks: {
    defaultMessage: 'Tarefas pendentes',
    id: '1IAVGz',
    description: 'Label for pending tasks selector item',
  },

  allTasks: {
    defaultMessage: 'Todas as tarefas',
    id: '728+oa',
    description: 'Label for all tasks selector item',
  },
})
