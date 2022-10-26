import { defineMessages } from 'react-intl'

type ProductivityAnswersCardMessages = 'chartTooltipTitle' | 'subtitleProductivityOnThisWeek'

export default defineMessages<ProductivityAnswersCardMessages>({
  chartTooltipTitle: {
    defaultMessage: 'Produtividade',
    id: 'B1P9ld',
    description:
      'This message appears on productivity chart tooltip as the title that suggests what the data means.',
  },

  subtitleProductivityOnThisWeek: {
    defaultMessage: 'Essa semana',
    id: 'fYwrtN',
    description:
      'This message appears with a subtitle in the cad that informs the user productivity status for the current week.',
  },
})
