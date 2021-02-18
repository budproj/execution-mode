import { defineMessages } from 'react-intl'

type CompanyProgressOverviewHeaderMessage = 'title'

export default defineMessages<CompanyProgressOverviewHeaderMessage>({
  title: {
    defaultMessage:
      'Como vai o desempenho d{gender, select, MALE {o} FEMALE {a} other {o}} <highlight>{company}</highlight> nesse trimestre?',
    id: 'z4STCs',
    description: 'The title of the header section in our company overview report',
  },
})
