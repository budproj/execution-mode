import { defineMessages } from 'react-intl'

type DashboardPageMessage =
  | 'greeting'
  | 'metaTitle'
  | 'metaDescription'
  | 'yearlySummaryTitle'
  | 'quarterlySummaryTitle'
  | 'okrOverViewTitle'
  | 'teamsOverviewTitle'
  | 'quarterlySummaryTitleTeam'

export default defineMessages<DashboardPageMessage>({
  greeting: {
    defaultMessage: 'Que bom te ver novamente, {name}! :)',
    id: '3IsNOi',
    description: 'The page title that our users should see in the dashboard page',
  },

  metaTitle: {
    defaultMessage: 'Painel | bud ',
    id: 'M9Jejl',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize os dados de avanço da empresa como um todo, suas prioridades, um gráfico de expectativa de avanço e o nível de confiança geral.',
    id: '6vXlkc',
    description: 'The page description that is displayed in Google and screen readers',
  },

  yearlySummaryTitle: {
    defaultMessage: 'OKRs Anuais Empresa',
    id: 'FQpqK8',
    description: 'The summary title for the yearly OKRs',
  },

  quarterlySummaryTitle: {
    defaultMessage: 'OKRs {quarter} Times',
    id: 'QoIlCT',
    description: 'The summery title for the quarterly OKRs',
  },
  quarterlySummaryTitleTeam: {
    defaultMessage: 'OKRs {quarter} {team}',
    id: 'WBbFfE',
    description: 'The summery title for the quarterly OKRs',
  },
  okrOverViewTitle: {
    defaultMessage: 'Visão geral dos OKRs',
    id: '7VhC49',
    description: 'The title of the OKRs overview',
  },
  teamsOverviewTitle: {
    defaultMessage: 'Visão geral dos times',
    id: 'SK6+Sz',
    description: 'The title of the teams overview',
  },
})
