import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LOADED`

export const openDrawer = atom<boolean>({
  key: KEY,
  default: false,
})

export default openDrawer
