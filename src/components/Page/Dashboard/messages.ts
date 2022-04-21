import { defineMessages } from 'react-intl'

type DashboardPageMessage =
  | 'greeting'
  | 'metaTitle'
  | 'metaDescription'
  | 'yearlySummaryTitle'
  | 'quarterlySummaryTitle'

export default defineMessages<DashboardPageMessage>({
  greeting: {
    defaultMessage: 'Bem-vind{gender, select, MALE {o} FEMALE {a} other {o}} de volta, {name} :)',
    id: 'gODdaE',
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
    defaultMessage: 'OKRs Anuais {year}',
    id: 'eG8Ohg',
    description: 'The summary title for the yearly OKRs',
  },

  quarterlySummaryTitle: {
    defaultMessage: 'OKRs Trimestrais {quarter}',
    id: 'nEQaGP',
    description: 'The summery title for the quarterly OKRs',
  },
})
