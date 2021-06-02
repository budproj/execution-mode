import { defineMessages } from 'react-intl'

type KeyResultFormatSelectMessage =
  | 'optionPercentTitle'
  | 'optionPercentExample'
  | 'optionNumberTitle'
  | 'optionNumberExample'
  | 'optionCoinBRLTitle'
  | 'optionCoinBRLExample'
  | 'optionCoinUSDTitle'
  | 'optionCoinUSDExample'

export default defineMessages<KeyResultFormatSelectMessage>({
  optionPercentTitle: {
    defaultMessage: 'Percentual',
    id: '84XFCQ',
    description:
      'This message is displayed inside our key-result format select as the title of the percent format',
  },

  optionPercentExample: {
    defaultMessage: '100%',
    id: 'aVLR+w',
    description:
      'This message is displayed inside our key-result format select as the example of the percent format',
  },

  optionNumberTitle: {
    defaultMessage: 'Numérico',
    id: '0OHE6C',
    description:
      'This message is displayed inside our key-result format select as the title of the number format',
  },

  optionNumberExample: {
    defaultMessage: '100',
    id: '8/Eg3L',
    description:
      'This message is displayed inside our key-result format select as the example of the number format',
  },

  optionCoinBRLTitle: {
    defaultMessage: 'Financeiro (Real)',
    id: '8YI1Fn',
    description:
      'This message is displayed inside our key-result format select as the title of the coin BRL format',
  },

  optionCoinBRLExample: {
    defaultMessage: 'R$ 100',
    id: '9dXuLd',
    description:
      'This message is displayed inside our key-result format select as the example of the coin BRL format',
  },

  optionCoinUSDTitle: {
    defaultMessage: 'Financeiro (Dólar)',
    id: 'ijCibq',
    description:
      'This message is displayed inside our key-result format select as the title of the coin USD format',
  },

  optionCoinUSDExample: {
    defaultMessage: 'US$ 100',
    id: 'Jkg7nT',
    description:
      'This message is displayed inside our key-result format select as the example of the coin USD format',
  },
})
