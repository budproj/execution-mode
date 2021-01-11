import { defineMessages } from 'react-intl'

type CompanyProgressOverviewHeaderMessage = 'title'

export default defineMessages<CompanyProgressOverviewHeaderMessage>({
  title: {
    defaultMessage:
      'Como vai o desempenho d{gender, select, MALE {o} FEMALE {a} other {o}} <highlight>{company}</highlight> como um todo?',
    id: '6KET/Z',
    description: 'The title of the header section in our company overview report',
  },
})
