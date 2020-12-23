import { atom } from 'recoil'

import { KeyResultView } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ATOM`

const keyResultViewAtom = atom<Partial<KeyResultView> | undefined>({
  key: KEY,
  default: undefined,
})

export default keyResultViewAtom
