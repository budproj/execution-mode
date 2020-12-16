import { Company } from 'src/components/Company/types'
import { Objective } from 'src/components/Objective/types'

export interface Cycle {
  id: string
  dateStart: Date
  dateEnd: Date
  createdAt: Date
  updatedAt: Date
  company: Company
  objectives?: Objective[]
}
