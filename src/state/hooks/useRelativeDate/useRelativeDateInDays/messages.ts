import { defineMessages } from 'react-intl'

type RelativeDateInDaysHookMessages = 'todayLabel' | 'yesterdayLabel'

export default defineMessages<RelativeDateInDaysHookMessages>({
  todayLabel: {
    defaultMessage: 'Hoje',
    id: 'th1Ney',
    description: 'This label is displayed if the date is today',
  },

  yesterdayLabel: {
    defaultMessage: 'Ontem',
    id: 'JZJeBS',
    description: 'This label is displayed if the last is yesterday',
  },
})
