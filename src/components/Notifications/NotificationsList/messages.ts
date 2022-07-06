import { defineMessages } from 'react-intl'

type NotificationsListMessagesProperties =
  | 'emptyStateLabel'
  | 'noMoreNotificationsLabel'
  | 'loadMoreNotificationsButton'

export default defineMessages<NotificationsListMessagesProperties>({
  emptyStateLabel: {
    defaultMessage: 'Você não tem nenhuma notificação.',
    id: 'R7I25V',
    description: 'This message appears in the empty state of the notifications listing.',
  },

  noMoreNotificationsLabel: {
    defaultMessage: 'Essas foram as suas notificações recentes!',
    id: 'OEPd1+',
    description: 'This message appears when no more notifications to listing.',
  },

  loadMoreNotificationsButton: {
    defaultMessage: 'Ver mais',
    id: '66spXk',
    description: 'This message appears on button that loading more notifications in list.',
  },
})
