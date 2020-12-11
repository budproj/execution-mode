import { MessageDescriptor } from 'react-intl'
import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { iconDescMessages } from './messages'
import { selectKeyResultIconDescBasedOnDrawing } from './selectors'
import { KeyResultIconDrawing } from './types'

const KEY = `${PREFIX}::DESC`

const desc = atomFamily<MessageDescriptor, KeyResultIconDrawing>({
  key: KEY,
  default: selectKeyResultIconDescBasedOnDrawing(iconDescMessages),
})

export default desc
