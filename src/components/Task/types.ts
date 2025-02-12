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

export interface NewTask {
  id: string
  team: string
  history: string[]
  status: TASK_STATUS
  title: string
  description: string
  dueDate: Date
  priority: number
  owner: string
  initialDate: Date
  attachments: string[]
  supportTeam: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  active?: boolean
  orderindex: number
  key_result?: string
  cycle: string | null
}

export interface TaskMeQuery {
  me: {
    tasks: GraphQLConnection<Task>
  }
}
