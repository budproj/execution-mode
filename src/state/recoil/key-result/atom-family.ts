import { atomFamily } from 'recoil'

import { KeyResult } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::KEY_RESULT_ATOM_FAMILY`

export const keyResultAtomFamily = atomFamily<KeyResult | undefined, KeyResult['id']>({
  key: KEY,
  default: undefined,
})

export default keyResultAtomFamily
