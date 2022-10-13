export interface Notification {
  id: string
  isRead: boolean
  type: string
  timestamp: string
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
    routine?: {
      teamName: string
    }
    sender: {
      id: string
      name: string
      picture: string
    }
  }
}
