import { Cycle } from 'src/components/Company/types'
import { KeyResult } from 'src/components/KeyResult/types'

export interface Objective {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  cycle: Cycle
  keyResults?: KeyResult[]
}
