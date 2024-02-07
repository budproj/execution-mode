import { atom } from 'recoil'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_ID`

export const taskDrawerIdAtom = atom<string>({
  key: KEY,
  default: undefined,
})
