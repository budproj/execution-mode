import { atom } from 'recoil'

import { Task } from 'src/services/task-management/task-management.service'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK`

export const taskDrawerAtom = atom<Task | undefined>({
  key: KEY,
  default: undefined,
})
