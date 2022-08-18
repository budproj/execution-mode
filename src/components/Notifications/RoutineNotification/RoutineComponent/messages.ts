import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage =
  | 'calendarIconDescription'
  | 'answerRoutineButton'
  | 'answerRoutineOutdatedText'
  | 'answerRoutineTodayText'

export default defineMessages<ExploreTeamPageMessage>({
  calendarIconDescription: {
    defaultMessage: 'A calendar icon',
    id: 'Xcxvrr',
    description: 'The description of the calendar icon at the routine notification component.',
  },
  answerRoutineButton: {
    defaultMessage: 'Responder',
    id: 'D22TnL',
    description: 'The text that goes in the answer routine button',
  },
  answerRoutineTodayText: {
    defaultMessage: 'Responder hoje',
    id: 'chwy/J',
    description:
      'The text that goes in the update text, below the routine title, when the routine is up to date.',
  },
  answerRoutineOutdatedText: {
    defaultMessage: 'Sem resposta na semana passada',
    id: 'GnbGX+',
    description:
      'The outdated text that goes in the update text, below the routine title, when the routine is outdated.',
  },
})
