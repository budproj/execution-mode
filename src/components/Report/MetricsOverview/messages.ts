import { defineMessages } from 'react-intl'

type MetricsOverview =
  | 'metricCardTitle'
  | 'metricCardSubtitle'
  | 'currentWeekTitle'
  | 'feelingRadialChartTitle'
  | 'productivityRadialChartTitle'
  | 'withBarrierRadialChartTitle'
  | 'productivityIconDescription'
  | 'pauseIconDescription'
  | 'byTeamMetricRowTitle'
  | 'loadMore'

export default defineMessages<MetricsOverview>({
  metricCardTitle: {
    defaultMessage: 'Clima dos Times {companypreposition} {company}',
    id: '4uGYvu',
    description: 'Title of the metrics card',
  },
  metricCardSubtitle: {
    defaultMessage: 'Segundo respostas da Retrospectiva da Semana',
    id: 'x4dJoK',
    description: 'Subtitle of the metrics card',
  },
  currentWeekTitle: {
    defaultMessage: 'Semana atual',
    id: '6P2s5k',
    description: 'The title of the current week indicator',
  },
  feelingRadialChartTitle: {
    defaultMessage: 'Sentimento',
    id: 'S/L2jr',
    description: 'The title of the feeling chart',
  },
  productivityRadialChartTitle: {
    defaultMessage: 'Produtividade',
    id: 'CmYkJk',
    description: 'The title of the productivity chart',
  },
  withBarrierRadialChartTitle: {
    defaultMessage: 'Bloqueio',
    id: 'xXhMFZ',
    description: 'The title of the with roadblock chart',
  },
  productivityIconDescription: {
    defaultMessage: 'Ícone de maleta representando o índice de produtividade',
    id: 'ADoBmy',
    description: 'The description of the productivty icon',
  },
  pauseIconDescription: {
    defaultMessage: 'Ícone de pausa representando a quantidade de bloqueios que a empresa tem',
    id: 'eJH8kc',
    description: 'The description of the with barrier icon',
  },
  byTeamMetricRowTitle: {
    defaultMessage: 'POR TIME',
    id: 'GqZyEx',
    description: 'The title of the team metrics rows',
  },
  loadMore: {
    defaultMessage: 'Carregar Mais',
    id: 'DaEVzP',
    description: 'Button title to load more rows',
  },
})
