import { atom } from 'recoil'

import { KeyResult } from 'src/components/KeyResult/types'

import { PREFIX } from '../constants'

const key = `${PREFIX}::TO_EDITING`

const editingKeyResultAtom = atom<KeyResult['id'] | undefined>({
  key,
  default: undefined,
})

export default editingKeyResultAtom
