import { Cycle } from 'components/Company/types'
import { KeyResult } from 'components/KeyResult/types'

export interface Objective {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  cycle: Cycle
  keyResults?: KeyResult[]
}
