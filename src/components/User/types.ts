import { KeyResult } from 'components/KeyResult'

export interface CustomSorting {
  keyResults: KeyResult['id'][]
}

export interface User {
  id: string
  name: string
  role: string
  customSorting: CustomSorting
}
