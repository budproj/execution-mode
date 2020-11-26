import { atom } from 'recoil'

import { KeyResult } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::VIEW_ATOM`

export const viewAtom = atom<KeyResult[] | undefined>({
  key: KEY,
  default: undefined,
})

export default viewAtom
