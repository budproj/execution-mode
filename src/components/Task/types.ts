import { User } from 'src/components/User/types'
import { TASK_STATUS } from 'src/services/new-task-management/@types/task-status.enum'

import { GraphQLConnection, GraphQLNode, GraphQLEntityPolicy } from '../types'

import { OLD_TASK_STATUS } from './constants'

export interface Task extends GraphQLNode {
  policy: GraphQLEntityPolicy
  description: string
  state: OLD_TASK_STATUS
  updatedAt: string
  keyResultId: string
  userId: User['id']
  assignedUserId: User['id']
  assignedUser: User
}

export interface NewTask {
  id: string
  key_result?: string | undefined
  orderindex: number
  status: TASK_STATUS
  initialDate: Date
  title: string
  description: string
  dueDate: Date
  history?: string[]
  priority: number
  owner: string
  attachments?: string[]
  supportTeam: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  team: string
  cycle?: string
  owner_full_name?: string
}

export interface TaskMeQuery {
  me: {
    tasks: GraphQLConnection<Task>
  }
}
