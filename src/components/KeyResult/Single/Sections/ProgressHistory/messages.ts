import { defineMessages } from 'react-intl'

type ProgressHistoryMessages =
  | 'metricName'
  | 'expectedName'
  | 'quarterlyTooltipPrefix'
  | 'yearlyTooltipPrefix'

export default defineMessages<ProgressHistoryMessages>({
  metricName: {
    defaultMessage: 'Progresso',
    id: 'QRn560',
    description:
      'This text is used inside our key-result sidebar, in the chart, as the metric name of a key-result progress',
  },

  expectedName: {
    defaultMessage: 'Esperado',
    id: 'nfdvr1',
    description: 'This message is displayed in the chart tooltip of our key-result sidebar',
  },

  quarterlyTooltipPrefix: {
    defaultMessage: 'Semana de',
    id: 'c8KQhI',
    description:
      'The prefix that appears in our chart tooltip in the key-result sidebar while seeing a quarterly key-result',
  },

  yearlyTooltipPrefix: {
    defaultMessage: 'Mês de',
    id: 'GrPUMn',
    description:
      'The prefix that appears in our chart tooltip in the key-result sidebar while seeing an yearly key-result',
  },
})
