import { Cycle } from 'src/components/Cycle/types'
import { Team } from 'src/components/Team/types'

export interface Company {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
  teams?: Team[]
  cycles?: Cycle[]
}
