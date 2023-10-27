import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage =
  | 'metaTitle'
  | 'metaDescription'
  | 'metaTitleLoadingFallback'
  | 'okrsTeamTab'
  | 'retrospectiveTeamTab'
  | 'tasksTeamTab'

export default defineMessages<ExploreTeamPageMessage>({
  metaTitle: {
    defaultMessage: '{team} | bud ',
    id: '4Ac1ls',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize os objetivos e resultados-chave de todos os times dessa área, se aprofunde no detalhamento de progresso, nível de confiança e dono.',
    id: 'fVyP58',
    description: 'The page description that is displayed in Google and screen readers',
  },

  metaTitleLoadingFallback: {
    defaultMessage: 'Área',
    id: 'QMM2q6',
    description:
      'The text that is displayed in the "team" values of the metaTitle message whiel the team name is being fetched',
  },

  okrsTeamTab: {
    defaultMessage: 'OKRs',
    id: 'wWbkGb',
    description: 'This is the title of the okrs tab on the team page.',
  },

  retrospectiveTeamTab: {
    defaultMessage: 'Retrospectiva',
    id: 'pAXjHu',
    description: 'This is the title of the retrospectives tab on the team page.',
  },

  tasksTeamTab: {
    defaultMessage: 'Tarefas',
    id: 'kPjmgU',
    description: 'This is the title of the tasks or project tab on the team page.',
  },
})
