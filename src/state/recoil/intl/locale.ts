import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LOCALE`

export const locale = atom<string>({
  key: KEY,
  default: '',
})
