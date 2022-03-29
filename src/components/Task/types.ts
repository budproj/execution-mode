import { User } from 'src/components/User/types'

import { GraphQLConnection, GraphQLNode, GraphQLEntityPolicy } from '../types'

import { TASK_STATUS } from './constants'

export interface Task extends GraphQLNode {
  policy: GraphQLEntityPolicy
  description: string
  state: TASK_STATUS
  updatedAt: string
  keyResultId: string
  userId: User['id']
  assignedUserId: User['id']
  assignedUser: User
}

export interface TaskMeQuery {
  me: {
    tasks: GraphQLConnection<Task>
  }
}
