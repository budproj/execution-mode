import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::LOCALE_ATOM`

const localeAtom = atom<string>({
  key: KEY,
  default: 'pt-BR',
})

export default localeAtom
