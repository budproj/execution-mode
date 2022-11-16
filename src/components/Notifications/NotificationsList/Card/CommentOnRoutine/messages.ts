import { defineMessages } from 'react-intl'

type CommentsNotificationsMessagesProperties =
  | 'taggedOnCommentOnRoutineNotification'
  | 'commentOnMyRoutineNotification'
  | 'calendarIconDescription'
  | 'weekRetrospective'

export default defineMessages<CommentsNotificationsMessagesProperties>({
  taggedOnCommentOnRoutineNotification: {
    defaultMessage: 'marcou você em um comentário de uma rotina:',
    id: '0ETGK9',
    description:
      'This message is displayed to describe a notification that occurs when a user is tagged in a comment on a routine.',
  },
  commentOnMyRoutineNotification: {
    defaultMessage: 'comentou na sua resposta de uma rotina:',
    id: 'dRKPeV',
    description:
      'This message is displayed to describe a notification that occurs when someone comments on a user`s routine.',
  },
  calendarIconDescription: {
    defaultMessage: 'A calendar icon',
    id: '3vQ6G9',
    description: 'This is the description of the calendar icon.',
  },
  weekRetrospective: {
    defaultMessage: 'Retrospectiva da Semana',
    id: 'ulMLmp',
    description: 'The week retrospective notification title.',
  },
})
