import { defineMessages, MessageDescriptor } from 'react-intl'

type CompanyProgressOverviewHeaderMessage = 'title'

const messages = defineMessages({
  title: {
    defaultMessage:
      'Como vai o desempenho d{gender, select, MALE {o} FEMALE {a} other {o}} <highlighted>{company}</highlighted> como um todo?',
    id: 'ELi8q5',
    description: 'The title of the header section in our company overview report',
  },
}) as Record<CompanyProgressOverviewHeaderMessage, MessageDescriptor>

export default messages
