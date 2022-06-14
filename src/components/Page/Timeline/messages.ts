import { defineMessages } from 'react-intl'

type TimelinePageMessage = 'metaTitle' | 'metaDescription'

export default defineMessages<TimelinePageMessage>({
  metaTitle: {
    defaultMessage: 'Timeline | bud',
    id: '//f0UA',
    description: 'The page title that is displayed in the browser tab',
  },

  metaDescription: {
    defaultMessage:
      'Visualize os objetivos e resultados-chave de todos os times dessa área, se aprofunde no detalhamento de progresso, nível de confiança e dono.',
    id: 'fVyP58',
    description: 'The page description that is displayed in Google and screen readers',
  },
})
