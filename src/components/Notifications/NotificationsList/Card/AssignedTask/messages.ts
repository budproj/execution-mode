import { defineMessages } from 'react-intl'

type AssignedTaskMessagesProperties = 'describeNotification'

export default defineMessages<AssignedTaskMessagesProperties>({
  describeNotification: {
    defaultMessage: 'atribuiu uma tarefa a você:',
    id: '8HUHbX',
    description:
      'This message appears as describe on notification where a user is assigned to a task.',
  },
})
