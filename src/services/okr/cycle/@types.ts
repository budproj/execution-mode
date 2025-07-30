export enum CycleCadence {
  YEARLY = 'Anual',
  QUARTERLY = 'Trimestal',
}

export type Cycle = {
  id: string
  date_start: Date
  date_end: Date
  team_id: string
  period: string
  cadence: CycleCadence
  parent_id: string
  active: boolean
}

export interface CycleFilter {
  year: string
  quarter: string
}
