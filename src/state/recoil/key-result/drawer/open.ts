import { atom } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::OPEN`

export const openDrawer = atom<KeyResult['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default openDrawer
