import { atomFamily } from 'recoil'

import { Task } from 'src/components/Task/types'

import { PREFIX } from './constants'

const KEY = `${PREFIX}::TASK_ATOM_FAMILY`

export const taskAtomFamily = atomFamily<Partial<Task> | undefined, Task['id'] | undefined>({
  key: KEY,
  default: undefined,
})

export default taskAtomFamily
