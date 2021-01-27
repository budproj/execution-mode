import { atom } from 'recoil'

import { KeyResultCustomList } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::ATOM`

const keyResultCustomListAtom = atom<Partial<KeyResultCustomList> | undefined>({
  key: KEY,
  default: undefined,
})

export default keyResultCustomListAtom
