import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

export interface Cycle {
  id: string
  dateStart: string
  dateEnd: string
  createdAt: string
  updatedAt: string
  team: Team
  name?: string
  objectives?: Objective[]
}
