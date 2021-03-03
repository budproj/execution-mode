import { defineMessages } from 'react-intl'

type KeyResultListBodyColumnProgressMessage = 'leftSideValueTooltip' | 'rightSideValueTooltip'

export default defineMessages<KeyResultListBodyColumnProgressMessage>({
  leftSideValueTooltip: {
    defaultMessage: 'Valor atual',
    id: 'QcCy51',
    description:
      'This tooltip is displayed when the user hovers the left side value of our progress bar',
  },

  rightSideValueTooltip: {
    defaultMessage: 'Meta',
    id: 'D9XMWI',
    description:
      'This tooltip is displayed when the user hovers the right side value of our progress bar',
  },
})
