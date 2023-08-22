import { defineMessages } from 'react-intl'

type ChartsMessages =
  | 'weekMean'
  | 'lowStatusPieChartMessage'
  | 'regularStatusPieChartMessage'
  | 'goodStatusPieChartMessage'
  | 'veryGoodStatusPieChartMessage'
  | 'excellentStatusPieChartMessage'
  | 'labelPieChartMessage'

export default defineMessages<ChartsMessages>({
  weekMean: {
    defaultMessage: 'Média da semana',
    id: 'JcoCf/',
    description: 'The description of the radial graph that indicates the week mean',
  },
  lowStatusPieChartMessage: {
    defaultMessage: 'Baixo',
    id: 'K2Hthp',
    description: 'The description of the pie chart graph that indicates the low status',
  },
  regularStatusPieChartMessage: {
    defaultMessage: 'Regular',
    id: 'q6A4Ae',
    description: 'The description of the pie chart graph that indicates the regular status',
  },
  goodStatusPieChartMessage: {
    defaultMessage: 'Bom',
    id: 'qQKiDF',
    description: 'The description of the pie chart graph that indicates the good status',
  },
  veryGoodStatusPieChartMessage: {
    defaultMessage: 'Muito bom',
    id: 's0wK0Y',
    description: 'The description of the pie chart graph that indicates the very good status',
  },
  excellentStatusPieChartMessage: {
    defaultMessage: 'Excelente',
    id: 'QT4yaV',
    description: 'The description of the pie chart graph that indicates the excellent status',
  },
  labelPieChartMessage: {
    defaultMessage: 'Boas práticas',
    id: 'tydp5X',
    description: 'The description of the pie chart graph that indicates the label',
  },
})
