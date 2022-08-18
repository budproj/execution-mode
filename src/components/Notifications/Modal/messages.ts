import { defineMessages } from 'react-intl'

type NotificationsModalMessages = 'notificationsTabOptions' | 'thisWeekTabOptions'

export default defineMessages<NotificationsModalMessages>({
  notificationsTabOptions: {
    defaultMessage: 'Notificações',
    id: 'Me1wRC',
    description:
      'This message appears as the title of the Notifications option in the notifications modal.',
  },

  thisWeekTabOptions: {
    defaultMessage: 'Minha semana',
    id: 'ICcB35',
    description:
      'This message appears as the title of the Check-ins and routine option in the notifications modal.',
  },
})
