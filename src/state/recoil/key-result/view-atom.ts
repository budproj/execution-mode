import { atom } from 'recoil'

import { KeyResultView } from 'components/KeyResult/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::VIEW_ATOM`

export const viewAtom = atom<KeyResultView | undefined>({
  key: KEY,
  default: undefined,
})

export default viewAtom
