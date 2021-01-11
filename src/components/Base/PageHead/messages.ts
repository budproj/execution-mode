import { defineMessages } from 'react-intl'

type PageHeadMessageKey = 'title' | 'description'

export default defineMessages<PageHeadMessageKey>({
  title: {
    defaultMessage: 'Bud',
    id: 'MpjjOt',
    description: 'The default title for our page head meta title value',
  },

  description: {
    defaultMessage: 'Bud é uma plataforma para gerenciamento de OKRs.',
    id: 'mkxm93',
    description: 'The default description for our page head meta description value',
  },
})
