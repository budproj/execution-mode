import { atom } from 'recoil'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::TITLE`

export const pageTitle = atom<string>({
  key: KEY,
  default: '',
})
