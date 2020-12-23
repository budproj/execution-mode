import { Company } from 'src/components/Company/types'
import { KeyResult } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'

import { Objective } from '../Objective/types'

export interface Team {
  id: string
  name: string
  description?: string
  currentProgress?: number
  currentConfidence?: number
  createdAt: Date
  updatedAt: Date
  company: Company
  keyResults?: KeyResult[]
  users?: User[]
  teams?: Team[]
  objectives?: Objective[]
}
