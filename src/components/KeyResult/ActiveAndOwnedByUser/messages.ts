import { defineMessages } from 'react-intl'

type KeyResultActiveAndOwnedByUserMessage = 'emptyStateLabel' | 'userTasksEmptyStateMessage'

export default defineMessages<KeyResultActiveAndOwnedByUserMessage>({
  emptyStateLabel: {
    defaultMessage: 'Você não tem nenhum resultado-chave',
    id: '/K30xB',
    description:
      'The label message that is displayed below our team at work image when the user has no key results in her/his key result view list',
  },
  userTasksEmptyStateMessage: {
    defaultMessage: '{username} ainda não está envolvido em nenhum resultado-chave.',
    id: 'yRU1Bz',
    description:
      'The label message that is displayed below our team at work image when a user has no key results in her/his key result view list',
  },
})
