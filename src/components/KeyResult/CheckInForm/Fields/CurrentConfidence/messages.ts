import { MessageDescriptor, defineMessages } from 'react-intl'

type CurrentConfidenceFieldMessages = 'label'

export default defineMessages({
  label: {
    defaultMessage: 'Qual o seu nível de confiança?',
    id: '00ogu4',
    description:
      'This is the label of the check-in form that indicates to which confidence level the user would update her/his key result',
  },
}) as Record<CurrentConfidenceFieldMessages, MessageDescriptor>
