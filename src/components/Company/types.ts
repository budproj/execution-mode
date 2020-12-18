import { Cycle } from 'src/components/Cycle/types'
import { Team } from 'src/components/Team/types'

import { User } from '../User/types'

export interface Company {
  id: string
  name: string
  description?: string
  currentProgress?: number
  currentConfidence?: number
  createdAt: Date
  updatedAt: Date
  teams?: Team[]
  cycles?: Cycle[]
  users?: User[]
}
