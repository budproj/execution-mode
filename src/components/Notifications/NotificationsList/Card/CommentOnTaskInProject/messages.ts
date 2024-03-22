import { defineMessages } from 'react-intl'

type CommentsNotificationsMessagesProperties =
  | 'taggedOnCommentInTaskNotification'
  | 'commentOnMyTaskNotification'

export default defineMessages<CommentsNotificationsMessagesProperties>({
  taggedOnCommentInTaskNotification: {
    defaultMessage: 'marcou você em um comentário:',
    id: 'iIm/1E',
    description:
      'This message is displayed to describe a notification that occurs when a user is tagged in a comment.',
  },
  commentOnMyTaskNotification: {
    defaultMessage: 'comentou em sua tarefa:',
    id: 'l3q85B',
    description:
      'This message is displayed to describe a notification that occurs when someone comments on a user`s KR.',
  },
})
