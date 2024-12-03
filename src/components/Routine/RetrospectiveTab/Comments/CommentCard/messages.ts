import { defineMessages } from 'react-intl'

type RoutineCommentCardMessages =
  | 'replyCommentButton'
  | 'excludeCommentButton'
  | 'deleteDialogTitle'

export default defineMessages<RoutineCommentCardMessages>({
  replyCommentButton: {
    defaultMessage: 'Responder',
    id: 'wsXNFt',
    description: 'This message appears as a label on the button used to reply to a comment.',
  },
  excludeCommentButton: {
    defaultMessage: 'Excluir',
    id: 'O60mSP',
    description: 'This message appears as a label on the button used to exclude a comment.',
  },
  deleteDialogTitle: {
    defaultMessage: 'Deseja excluir esse comentário?',
    id: 'IoZbDV',
    description: 'This message appears in delete modal confirmation.',
  },
})
