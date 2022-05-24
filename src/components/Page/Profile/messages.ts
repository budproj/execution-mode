import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'metaTitle'
  | 'metaDescription'
  | 'pageTitle'
  | 'pageSubtitle'
  | 'taskTitle'
  | 'historyIconDescription'
  | 'historyButtonTitle'
  | 'individualOkrsCompanyMembersTitle'
  | 'individualOKRSubTitle'
  | 'individualOKRTitle'
  | 'companyOKRTitle'
  | 'individualOKRTitle'
  | 'backToThePresentButtonTitle'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  metaTitle: {
    defaultMessage: 'Perfil',
    id: '/uYO8t',
    description: 'The page meta title',
  },
  companyOKRTitle: {
    defaultMessage: 'OKRs da {company}',
    id: 'EG9UsD',
    description: 'Company OKR title of the page',
  },
  individualOKRTitle: {
    defaultMessage: 'Planejamento individual',
    id: 'YxKyjP',
    description: 'Individual OKR title of the page',
  },

  metaDescription: {
    defaultMessage:
      'Visualize o perfil de outro membro da empresa, interaja com seus resultados-chave relacionados a estratégia e também os explore os resultados-chave individuais',
    id: 'x7doNg',
    description: 'The page meta description',
  },

  pageTitle: {
    defaultMessage: 'Coisas de {username}',
    id: 'JItuU0',
    description: 'The page title for users profile',
  },

  pageSubtitle: {
    defaultMessage: 'Estes são os resultados-chave e as tarefas atribuídos a {username}.',
    id: 'H0xYvz',
    description: 'The page subtitle for users profile',
  },
  individualOKRSubTitle: {
    defaultMessage:
      'Veja os OKRs Individuais de { username }. Eles não interferem no progresso geral da empresa.',
    id: 'Tsd4ry',
    description: 'Individual OKR subtitle of the page',
  },
  taskTitle: {
    defaultMessage: 'TAREFAS EM OKRs',
    id: 'hL/jUm',
    description: 'The title for tasks section in the profile page',
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
  individualOkrsCompanyMembersTitle: {
    defaultMessage: 'Colegas com planejamento individual',
    id: 'SmMx3s',
    description: 'Friends with individual OKRs title',
  },
  backToThePresentButtonTitle: {
    defaultMessage: 'Voltar ao presente',
    id: 't0t6MQ',
    description: 'The button title to go back to the present',
  },
})
