import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconDrawingBasedOnTitle } from './selectors'
import { KeyResultIconDrawing } from './types'

const KEY = `${PREFIX}::DRAWING`

const drawing = atomFamily<KeyResultIconDrawing, string | undefined>({
  key: KEY,
  default: selectKeyResultIconDrawingBasedOnTitle,
})

export default drawing
