import { KeyResult } from 'src/components/KeyResult/types'
import { Objective } from 'src/components/Objective/types'
import { User } from 'src/components/User/types'

export interface GetRootTeamsAndCompaniesQueryData {
  teams: Array<Partial<Team>>
  companies: Array<Partial<Company>>
}

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
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  teams?: Team[]
  cycles?: Cycle[]
}
