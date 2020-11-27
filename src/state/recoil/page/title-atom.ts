import { atom } from 'recoil'

import { PREFIX } from './constants'

export const KEY = `${PREFIX}::TITLE_ATOM`

const titleAtom = atom<string>({
  key: KEY,
  default: '',
})

export default titleAtom
