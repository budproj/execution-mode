import { Objective } from 'src/components/Objective/types'
import { Team } from 'src/components/Team/types'

import { KeyResult } from '../KeyResult/types'

import { CADENCE } from './constants'

export interface Cycle {
  id: string
  period: string
  cadence: CADENCE
  dateStart: string
  dateEnd: string
  active: boolean
  createdAt: string
  updatedAt: string
  team: Team
  parent?: Cycle
  cycles?: Cycle[]
  objectives?: Objective[]
  keyResults?: KeyResult[]
}
