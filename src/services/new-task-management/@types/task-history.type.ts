import { User } from 'src/components/User/types'

import { Task } from './task.type'

export interface TaskHistory {
  id: string
  task: Task
  field: string
  oldState: string
  newState: string
  author: User
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
