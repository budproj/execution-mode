import { defineMessages } from 'react-intl'

type FeelingAnswerCardMessages =
  | 'chartTooltipTitle'
  | 'subtitleFeelingOnThisWeek'
  | 'feelingCallToActionMessage'

export default defineMessages<FeelingAnswerCardMessages>({
  chartTooltipTitle: {
    defaultMessage: 'Sentimento',
    id: '6gyBBo',
    description:
      'This message appears on feeling chart tooltip as the title that suggests what the data means.',
  },

  subtitleFeelingOnThisWeek: {
    defaultMessage: 'Essa semana',
    id: 'eQSkLB',
    description:
      'This message appears with a subtitle in the cad that informs the user feeling status for the current week.',
  },

  feelingCallToActionMessage: {
    defaultMessage: '{user} está passando por um momento difícil. Que tal uma conversa?',
    id: 'GYE/N/',
    description:
      'This message appears how a call to action when the feeling answer refer the bad something.',
  },
})
