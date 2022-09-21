export interface PendingRoutine {
  id: string
  name: string
  daysOutdated: number
  status: {
    latestReply: string
  }
}
