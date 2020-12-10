import { MessageDescriptor, defineMessages } from 'react-intl'

type GoalFieldMessages = 'label'

export default defineMessages({
  label: {
    defaultMessage: 'Meta:',
    id: '1nABM7',
    description:
      'This is the label of the check-in form that indicates the goal for her/his key result',
  },
}) as Record<GoalFieldMessages, MessageDescriptor>
