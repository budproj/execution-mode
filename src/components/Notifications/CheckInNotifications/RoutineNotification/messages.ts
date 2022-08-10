import { defineMessages } from 'react-intl'

type ExploreTeamPageMessage =
  | 'calendarIconDescription'
  | 'answerRoutineButton'
  | 'answerRoutineOutdatedText'

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
  answerRoutineOutdatedText: {
    defaultMessage: 'Responder hoje',
    id: 'flwVUo',
    description: 'The outdated text that goes in update text, below the routine title.',
  },
})
