import { MessageDescriptor } from 'react-intl'

import { KEY_RESULT_FORMAT } from '../constants'

export type FormatOption = {
  id: KEY_RESULT_FORMAT
  title: MessageDescriptor
  example: MessageDescriptor
}
