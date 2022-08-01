import { defineMessages } from 'react-intl'

type CommentsNotificationsMessagesProperties =
  | 'taggedOnCommentNotification'
  | 'commentOnMyKrNotification'

export default defineMessages<CommentsNotificationsMessagesProperties>({
  taggedOnCommentNotification: {
    defaultMessage: 'marcou você em um comentário:',
    id: 'iIm/1E',
    description:
      'This message is displayed to describe a notification that occurs when a user is tagged in a comment.',
  },
  commentOnMyKrNotification: {
    defaultMessage: 'comentou no seu resultado-chave:',
    id: 'ATbiBE',
    description:
      'This message is displayed to describe a notification that occurs when someone comments on a user`s KR.',
  },
})
