import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_DRAWER_ID`

export const isEditingTaskDrawerIdAtom = atom<string | undefined>({
  key: KEY,
  default: undefined,
})
