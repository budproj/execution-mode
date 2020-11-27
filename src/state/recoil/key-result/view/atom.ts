import { atom } from 'recoil'

import { KeyResultView } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ATOM`

const keyResultViewAtom = atom<KeyResultView | undefined>({
  key: KEY,
  default: undefined,
})

export default keyResultViewAtom
