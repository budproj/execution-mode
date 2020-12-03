import { MessageDescriptor, defineMessages } from 'react-intl'

type CurrentProgressFieldMessages = 'label'

export default defineMessages({
  label: {
    defaultMessage: 'Para:',
    id: 'vEnRa9',
    description:
      'This is the label of the check-in form that indicates to which value the user would update her/his key result',
  },
}) as Record<CurrentProgressFieldMessages, MessageDescriptor>
