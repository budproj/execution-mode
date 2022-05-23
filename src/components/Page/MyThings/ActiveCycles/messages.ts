import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'companyOKRTitle'
  | 'individualOKRTitle'
  | 'companyOKRSubTitle'
  | 'individualOKRSubTitle'
  | 'metaTitle'
  | 'metaDescription'
  | 'firstTab'
  | 'secondTab'
  | 'myTasksTitle'
  | 'pendingTasks'
  | 'allTasks'
  | 'historyIconDescription'
  | 'historyButtonTitle'
  | 'individualOkrsCompanyMembersTitle'
  | 'createObjectiveButtonTitle'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  companyOKRTitle: {
    defaultMessage: 'OKRs da {company}',
    id: 'EG9UsD',
    description: 'Company OKR title of the page',
  },
  companyOKRSubTitle: {
    defaultMessage: 'Veja seus resultados-chave e tarefas relacionadas à estratégia da empresa.',
    id: '608lDc',
    description: 'Company OKR subtitle of the page',
  },
  individualOKRTitle: {
    defaultMessage: 'Planejamento individual',
    id: 'YxKyjP',
    description: 'Individual OKR title of the page',
  },
  individualOKRSubTitle: {
    defaultMessage:
      'O planejamento individual é definido por você. Eles não interferem no progresso da empresa, mas podem ser vistos por seus colegas.',
    id: 'kEofXd',
    description: 'Individual OKR subtitle of the page',
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
  historyIconDescription: {
    defaultMessage: 'Ícone de histórico',
    id: 'ShzOP9',
    description: 'Icon description for history icon',
  },
  historyButtonTitle: {
    defaultMessage: 'Histórico',
    id: 'K4Rjji',
    description: 'Title of the history button',
  },
  createObjectiveButtonTitle: {
    defaultMessage: 'Criar objetivo',
    id: 'Jk/gDc',
    description: 'Title of the create objective button',
  },
  individualOkrsCompanyMembersTitle: {
    defaultMessage: 'Colegas com planejamento individual',
    id: 'SmMx3s',
    description: 'Friends with individual OKRs title',
  },
})
