import { defineMessages } from 'react-intl'

type ProgressHistoryMessages = 'metricName' | 'expectedName'

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
})
