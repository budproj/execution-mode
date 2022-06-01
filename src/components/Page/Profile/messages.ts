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
    defaultMessage: 'OKRs {companypreposition} {company}',
    id: 'dbh5MZ',
    description: 'Company OKR title of the page',
  },
  individualOKRTitle: {
    defaultMessage: 'Plano Individual',
    id: 'GuD4W6',
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
      'Os OKRs do Plano Individual são definidos por cada pessoa. Eles não interferem no progresso da empresa.',
    id: '32YYOa',
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
    defaultMessage: 'Colegas com plano individual',
    id: 'oGyXN5',
    description: 'Friends with individual OKRs title',
  },
  backToThePresentButtonTitle: {
    defaultMessage: 'Voltar ao presente',
    id: 't0t6MQ',
    description: 'The button title to go back to the present',
  },
})
