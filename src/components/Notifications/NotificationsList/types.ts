export interface NotificationsProperties {
  id?: string
  isRead?: boolean
  type?: string
  timestamp: number
  recipientId?: string
  sender?: {
    id: string
    name: string
    picture: string
  }
}
