export interface NotificationsProperties {
  id?: string
  isRead?: boolean
  type?: string
  timestamp?: string
  recipientId?: string
  sender?: {
    id: string
    name: string
    picture: string
  }
}
