import { defineMessages } from 'react-intl'

type NotificationsModalMessages = 'notificationsTabOptions' | 'checkInsTabOptions'

export default defineMessages<NotificationsModalMessages>({
  notificationsTabOptions: {
    defaultMessage: 'Notificações',
    id: 'Me1wRC',
    description:
      'This message appears as the title of the Notifications option in the notifications modal.',
  },

  checkInsTabOptions: {
    defaultMessage: 'Check-in',
    id: 'lpsQj3',
    description:
      'This message appears as the title of the Check-ins option in the notifications modal.',
  },
})
