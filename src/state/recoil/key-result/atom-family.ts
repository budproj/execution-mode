import { atomFamily } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::KEY_RESULT_ATOM_FAMILY`

export const keyResultAtomFamily = atomFamily<
  Partial<KeyResult> | undefined,
  KeyResult['id'] | undefined
>({
  key: KEY,
  default: undefined,
})

export default keyResultAtomFamily
