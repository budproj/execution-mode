import { defineMessages } from 'react-intl'

type CadenceHookMessage = 'yearlyPrefix' | 'quarterlyPrefix'

export default defineMessages<CadenceHookMessage>({
  yearlyPrefix: {
    defaultMessage: 'Anual',
    id: 'gu4aCE',
    description: 'This text is used as prefix for our yearly cadences',
  },

  quarterlyPrefix: {
    defaultMessage: 'Trimestral',
    id: 'qytqsj',
    description: 'This text is used as prefix for our quarterly cadences',
  },
})
