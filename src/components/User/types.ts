import { KeyResult } from 'components/KeyResult'

export interface CustomSorting {
  user: User['id']
  keyResults: Array<KeyResult['id']>
}

export interface User {
  id: string
  name: string
  role: string
}
