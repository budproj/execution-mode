import { defineMessages } from 'react-intl'

type MyKeyResultsActiveCyclesPageMessage =
  | 'metaTitle'
  | 'metaDescription'
  | 'pageTitle'
  | 'pageSubtitle'
  | 'yearlyProgress'
  | 'quarterlyProgress'
  | 'taskTitle'

export default defineMessages<MyKeyResultsActiveCyclesPageMessage>({
  metaTitle: {
    defaultMessage: 'Perfil',
    id: '/uYO8t',
    description: 'The page meta title',
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

  yearlyProgress: {
    defaultMessage: 'Progresso Anual',
    id: '4MCOg+',
    description: "User's yearly progress title",
  },

  quarterlyProgress: {
    defaultMessage: 'Progresso Trimestral',
    id: 'BOJlqi',
    description: "User's quarterly progress title",
  },

  taskTitle: {
    defaultMessage: 'TAREFAS EM OKRs',
    id: 'hL/jUm',
    description: 'The title for tasks section in the profile page',
  },
})
