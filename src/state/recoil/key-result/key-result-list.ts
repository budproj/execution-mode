import { atom } from 'recoil'

import { PREFIX } from './constants'

const key = `${PREFIX}::CONTROL_LIST_MODAL`

export const isKeyResultListOpenAtom = atom<boolean>({
  key: `${key}::IS_OPEN`,
  default: false,
})
