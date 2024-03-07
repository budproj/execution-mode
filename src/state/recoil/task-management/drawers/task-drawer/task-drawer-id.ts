import { atom } from 'recoil'

import { Task } from 'src/services/task-management/task-management.service'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_ID`

export const taskDrawerIdAtom = atom<string | undefined | Task['_id']>({
  key: KEY,
  default: undefined,
})
