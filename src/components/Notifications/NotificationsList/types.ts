export interface Notification {
  id: string
  isRead: boolean
  type: string
  timestamp: Date
  recipientId: string
  properties: {
    keyResult?: {
      id: string
      name: string
    }
    previousConfidance?: number
    newConfidence?: number
    comment?: {
      id: string
      content: string
    }
    task?: {
      id: string
      name: string
    }
    sender: {
      id: string
      name: string
      picture: string
    }
  }
}
