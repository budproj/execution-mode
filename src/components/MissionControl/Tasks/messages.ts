import { defineMessages } from 'react-intl'

type MissionControlTaskMessages =
  | 'keyResultCheckinTaskMessageTitle'
  | 'outdatedKeyResultCommentTaskMessageTitle'
  | 'keyResultEmptyDescriptionTaskMessageTitle'
  | 'keyResultCommentTaskMessageTitle'
  | 'lowConfidenceKeyResultCommentTaskMessageTitle'
  | 'barrierKeyResultCommentTaskMessageTitle'
  | 'keyResultCheckinTaskMessageDescription'
  | 'outdatedKeyResultCommentTaskMessageDescription'
  | 'keyResultEmptyDescriptionTaskMessageDescription'
  | 'keyResultCommentTaskMessageDescription'
  | 'lowConfidenceKeyResultCommentTaskMessageDescription'
  | 'barrierKeyResultCommentTaskMessageDescription'
  | 'goToKeyResultActionLabelMessage'
  | 'goToTeamActionLabelMessage'
  | 'listTasksSectionTitle'
  | 'leaderLabel'
  | 'emptyTasksMessageTitle'
  | 'emptyTasksMessageDescription'

export default defineMessages<MissionControlTaskMessages>({
  keyResultCheckinTaskMessageTitle: {
    defaultMessage: 'Realize o check-in em seus resultados-chave',
    id: '2rTc9E',
    description: 'The page title that our users should see in the dashboard page',
  },
  outdatedKeyResultCommentTaskMessageTitle: {
    defaultMessage: '{leader} Comente nos resultados-chave pouco atualizados',
    id: 'v4RcBJ',
    description: 'The page title that our users should see in the dashboard page',
  },
  keyResultEmptyDescriptionTaskMessageTitle: {
    defaultMessage: 'Crie descrições detalhadas nos seus resultados-chave',
    id: 'DBnPB3',
    description: 'The page title that our users should see in the dashboard page',
  },
  keyResultCommentTaskMessageTitle: {
    defaultMessage: 'Comente em algum resultado-chave da empresa',
    id: 'hNsMcg',
    description: 'The page title that our users should see in the dashboard page',
  },
  lowConfidenceKeyResultCommentTaskMessageTitle: {
    defaultMessage: '{leader} Comente nos resultados-chave com Baixa confiança',
    id: 'fjeSHd',
    description: 'The page title that our users should see in the dashboard page',
  },
  barrierKeyResultCommentTaskMessageTitle: {
    defaultMessage: '{leader} Comente nos resultados-chave com Barreira',
    id: 'HDxm2W',
    description: 'The page title that our users should see in the dashboard page',
  },
  keyResultCheckinTaskMessageDescription: {
    defaultMessage:
      'A rotina semanal de check-in é parte fundamental para conseguir acompanhar a evolução de uma estratégia',
    id: 'JrryPL',
    description: 'The page title that our users should see in the dashboard page',
  },
  outdatedKeyResultCommentTaskMessageDescription: {
    defaultMessage: 'Resultados-chave sem atualizações se tornam difíceis de acompanhar',
    id: 'uORr+d',
    description: 'The page title that our users should see in the dashboard page',
  },
  keyResultEmptyDescriptionTaskMessageDescription: {
    defaultMessage:
      'É importante que os resultados-chave tenham descrição para que todos entendam melhor a estratégia',
    id: '371LdJ',
    description: 'The page title that our users should see in the dashboard page',
  },
  keyResultCommentTaskMessageDescription: {
    defaultMessage:
      'Além da estratégia do seu time, busque compartilhar suas ideias em resultados-chave da empresa',
    id: 'UJijyu',
    description: 'The page title that our users should see in the dashboard page',
  },
  lowConfidenceKeyResultCommentTaskMessageDescription: {
    defaultMessage:
      'Busque entender a sinalização e como você pode contribuir com esses resultados-chave',
    id: 'SW8YCX',
    description: 'The page title that our users should see in the dashboard page',
  },
  barrierKeyResultCommentTaskMessageDescription: {
    defaultMessage:
      'Busque entender as barreiras e como você pode contribuir com esses resultados-chave',
    id: '7ZtAaa',
    description: 'The page title that our users should see in the dashboard page',
  },
  goToKeyResultActionLabelMessage: {
    defaultMessage: 'Meus resultados-chave',
    id: 'KjG7j3',
    description: 'The page title that our users should see in the dashboard page',
  },
  goToTeamActionLabelMessage: {
    defaultMessage: 'Ir para o time',
    id: 'sBSvDB',
    description: 'The page title that our users should see in the dashboard page',
  },
  listTasksSectionTitle: {
    defaultMessage: 'desafios e Tarefas da semana',
    id: 'PJSgbG',
    description: 'The page title that our users should see in the dashboard page',
  },
  leaderLabel: {
    defaultMessage: 'Líder',
    id: 'j259Ph',
    description: 'The page title that our users should see in the dashboard page',
  },
  emptyTasksMessageTitle: {
    defaultMessage: 'Não há tarefas pra você nesse time',
    id: 'bmhAwE',
    description: 'The page title that our users should see in the dashboard page',
  },
  emptyTasksMessageDescription: {
    defaultMessage: 'Ainda não há tarefas designadas para você nesse time.',
    id: 'Epx9q+',
    description: 'The page title that our users should see in the dashboard page',
  },
})
