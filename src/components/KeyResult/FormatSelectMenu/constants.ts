import { KEY_RESULT_FORMAT } from '../constants'

import messages from './messages'
import { FormatDetails } from './types'

export const DEFAULT_FORMAT_OPTIONS: Record<KEY_RESULT_FORMAT, FormatDetails> = {
  [KEY_RESULT_FORMAT.PERCENTAGE]: {
    title: messages.optionPercentTitle,
    example: messages.optionPercentExample,
  },
  [KEY_RESULT_FORMAT.NUMBER]: {
    title: messages.optionNumberTitle,
    example: messages.optionNumberExample,
  },
  [KEY_RESULT_FORMAT.COIN_BRL]: {
    title: messages.optionCoinBRLTitle,
    example: messages.optionCoinBRLExample,
  },
  [KEY_RESULT_FORMAT.COIN_USD]: {
    title: messages.optionCoinUSDTitle,
    example: messages.optionCoinUSDExample,
  },
}
