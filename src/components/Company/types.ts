import { KeyResult } from 'components/KeyResult/types'
import { Objective } from 'components/Objective/types'
import { User } from 'components/User/types'

export interface Cycle {
  id: string
  dateStart: Date
  dateEnd: Date
  createdAt: Date
  updatedAt: Date
  company: Company
  objectives?: Objective[]
}

export interface Team {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  company: Company
  keyResults?: KeyResult[]
  users?: User[]
}

export interface Company {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  teams?: Team[]
  cycles?: Cycle[]
}
