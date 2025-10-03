import { User } from 'src/components/User/types'
import { Except } from 'src/helpers/except'
import { KeyResult } from 'src/services/key-result/@types'

import { TASK_STATUS } from './task-status.enum'

export type Task = {
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
  supportTeam?: User[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  active?: boolean
  orderindex: number
  keyResult?: KeyResult
  cycle?: string
  usersRelated: User[]
  ownerFullName: string
}

export type TaskInsert = Except<Task, 'id' | 'createdAt' | 'updatedAt' | 'history'>
