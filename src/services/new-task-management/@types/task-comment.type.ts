import { User } from 'src/components/User/types'
import { Except } from 'src/helpers/except'

import { Task } from './task.type'

export interface TaskComment {
  id: string
  text: string
  task: Task
  user: User
  parent?: TaskComment
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}

export interface TaskCommentInsert
  extends Omit<Except<TaskComment, 'createdAt' | 'updatedAt'>, 'id' | 'task' | 'user'> {
  taskId: string
  userId: string
}
