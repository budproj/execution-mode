import { atom } from 'recoil'

import { Task } from 'src/services/new-task-management/@types/task.type'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK`

export const taskDrawerAtom = atom<Task>({
  key: KEY,
  default: undefined,
})
