import { KeyResultCheckIn } from 'src/components/KeyResult/types'
import { Except } from 'src/helpers/except'
import { TASK_STATUS } from 'src/services/new-task-management/new-task-management.service'

enum KeyResultFormat {
  NUMBER = 'NUMBER',
  PERCENTAGE = 'PERCENTAGE',
  COIN_BRL = 'COIN_BRL',
  COIN_USD = 'COIN_USD',
  COIN_EUR = 'COIN_EUR',
  COIN_GBP = 'COIN_GBP',
}

enum KeyResultType {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
}

enum KeyResultMode {
  COMPLETED = 'COMPLETED',
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
}

export type KeyResult = {
  id: string
  title: string
  goal: number
  initialValue: number
  description: string
  format: KeyResultFormat
  objectiveId: string
  team: string
  ownerId: string
  type: KeyResultType
  mode: KeyResultMode
  commentCount: JSON
  lastUpdatedBy: string
  createdAt: Date
  updatedAt: Date
  lastCheckin?: KeyResultCheckIn
}

export type TaskSummary = {
  id: string
  teamId: string
  owner: string
  ownerFullName: string
  status: TASK_STATUS
  title: string
  description: string
  priority: number
  supportTeam: string[]
}

export type KeyResultWithTasks = KeyResult & {
  krTasks: TaskSummary[]
}

export type TaskInsert = Except<KeyResult, 'id' | 'createdAt' | 'updatedAt'>
