import { KEY_RESULT_FORMAT } from '../constants'

import messages from './messages'
import { FormatOption } from './types'

export const DEFAULT_FORMAT_OPTIONS: FormatOption[] = [
  {
    id: KEY_RESULT_FORMAT.PERCENTAGE,
    title: messages.optionPercentTitle,
    example: messages.optionPercentExample,
  },
]
