import { atom } from 'recoil'

import { KeyResult } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::POPOVER_SLIDER`

export const popoverSlider = atom<KeyResult['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default popoverSlider
