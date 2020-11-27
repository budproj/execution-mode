import { atomFamily } from 'recoil'

import { PREFIX } from './constants'
import { selectKeyResultIconDrawingBasedOnTitle } from './selectors'

const KEY = `${PREFIX}::DRAWING_ATOM`

type KeyResultIconDrawingParameter = string

const drawingAtom = atomFamily<string, KeyResultIconDrawingParameter>({
  key: KEY,
  default: selectKeyResultIconDrawingBasedOnTitle,
})

export default drawingAtom
