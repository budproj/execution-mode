export interface Objective {
  id: string
  title: string
  cycleId: string
  description?: string
  mode?: string
  owner?: string
  teamId?: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
