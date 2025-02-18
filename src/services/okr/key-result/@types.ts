import { Except } from 'src/helpers/except'

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
  objective_id: string
  team_id: string
  owner_id: string
  type: KeyResultType
  mode: KeyResultMode
  comment_count: JSON
  last_updated_by: string
  createdAt: Date
  updatedAt: Date
}

export type TaskInsert = Except<KeyResult, 'id' | 'createdAt' | 'updatedAt'>
