import { defineMessages, MessageDescriptor } from 'react-intl'

type CompanyProgressOverviewHeaderMessage = 'title'

const messages = defineMessages({
  title: {
    defaultMessage:
      'Como vai o desempenho d{gender, select, MALE {o} FEMALE {a} other {o}} <highlight>{company}</highlight> como um todo?',
    id: '6KET/Z',
    description: 'The title of the header section in our company overview report',
  },
}) as Record<CompanyProgressOverviewHeaderMessage, MessageDescriptor>

export default messages
