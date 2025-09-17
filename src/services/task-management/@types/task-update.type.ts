import { User } from 'src/components/User/types'
import { KeyResult } from 'src/services/key-result/@types'

import { TASK_STATUS } from './task-status.enum'

export type TaskUpdate = {
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
  supportTeam?: string[]
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
