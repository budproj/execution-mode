import { defineMessages } from 'react-intl'

type RoutineCommentsMessages = 'emptyStateDescription' | 'commentsSectionTitle'

export default defineMessages<RoutineCommentsMessages>({
  emptyStateDescription: {
    defaultMessage: 'Seja o primeiro a comentar a resposta de {user}!',
    id: 'gUHlz3',
    description:
      'This message appears in the empty state of comments in a user retrospective reply.',
  },
  commentsSectionTitle: {
    defaultMessage: 'Comentários: ',
    id: 'kjKwCU',
    description:
      'This message appears as the empty state title of comments in a user retrospective reply',
  },
})
