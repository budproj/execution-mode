import { defineMessages } from 'react-intl'

type CycleFilterQuarterSelectorMessage =
  | 'quarterEmptyStateFirstButton'
  | 'quarterEmptyStateSecondButton'
  | 'quarterEmptyStateThirdButton'
  | 'quarterEmptyStateFourthButton'

export default defineMessages<CycleFilterQuarterSelectorMessage>({
  quarterEmptyStateFirstButton: {
    defaultMessage: 'Q1',
    id: 'fI4P80',
    description:
      'This button appears as an empty state while the user is selecting the cycle filter',
  },

  quarterEmptyStateSecondButton: {
    defaultMessage: 'Q2',
    id: 'aKyktL',
    description:
      'This button appears as an empty state while the user is selecting the cycle filter',
  },

  quarterEmptyStateThirdButton: {
    defaultMessage: 'Q3',
    id: 'znpwST',
    description:
      'This button appears as an empty state while the user is selecting the cycle filter',
  },

  quarterEmptyStateFourthButton: {
    defaultMessage: 'Q4',
    id: 'u4rqek',
    description:
      'This button appears as an empty state while the user is selecting the cycle filter',
  },
})
