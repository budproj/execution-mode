import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

export interface Cycle {
  id: string
  dateStart: Date
  dateEnd: Date
  createdAt: Date
  updatedAt: Date
  team: Team
  objectives?: Objective[]
}
