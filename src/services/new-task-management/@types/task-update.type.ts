import { Except } from 'src/helpers/except'

import { Task } from './task.type'

export interface TaskUpdate
  extends Omit<
    Except<
      Task,
      | 'createdAt'
      | 'updatedAt'
      | 'history'
      | 'attachments'
      | 'tags'
      | 'orderindex'
      | 'usersRelated'
      | 'ownerFullName'
      | 'team'
    >,
    'dueDate' | 'initialDate' | 'keyResult' | 'id'
  > {
  id?: string
  keyResult?: string
  dueDate: string
  initialDate: string
}
