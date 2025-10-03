import { User } from 'src/components/User/types'

export interface Team {
  id: string
  name: string
  gender: string
  description?: string
  parentId?: string
  owner?: User
  users: string[]
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
