import { atom } from 'recoil'

import { Task } from 'src/services/new-task-management/new-task-management.service'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK`

export const taskDrawerAtom = atom<Task>({
  key: KEY,
  default: undefined,
})
