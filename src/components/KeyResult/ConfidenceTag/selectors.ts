import { MessageDescriptor } from 'react-intl'

import { ConfidenceReport } from 'components/KeyResult/types'

import messages from './messages'

export interface Tag {
  message: MessageDescriptor
  desc: MessageDescriptor
  color: string
}

export const selectConfidenceTag = (confidence: ConfidenceReport['valueNew']): Tag => {
  if (confidence >= 50)
    return {
      message: messages.upToDate,
      desc: messages.descUpToDate,
      color: 'green.500',
    }
  if (confidence >= 25 && confidence < 50)
    return {
      message: messages.atRisk,
      desc: messages.descAtRisk,
      color: 'yellow.500',
    }
  return {
    message: messages.overdue,
    desc: messages.descOverdue,
    color: 'red.500',
  }
}
