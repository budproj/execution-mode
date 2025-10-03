import { TASK_STATUS } from 'src/services/task-management/@types/task-status.enum'

import messages from '../messages'

export function swap<T>(array: T[], index: number, index_: number): T[] {
  const copy = [...array]
  const temporary = copy[index]
  copy[index] = copy[index_]
  copy[index_] = temporary
  return copy
}

export const headerColumnMessage = new Map([
  [TASK_STATUS.pending, messages.pendingColumnHeading],
  [TASK_STATUS.toDo, messages.todoColumnHeading],
  [TASK_STATUS.doing, messages.doingColumnHeading],
  [TASK_STATUS.done, messages.doneColumnHeading],
])

export const ColumnColorScheme: Record<TASK_STATUS, string> = {
  pending: 'new-gray.600',
  toDo: 'yellow.600',
  doing: 'green.500',
  done: 'brand.500',
}
