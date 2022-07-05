import { Box } from '@chakra-ui/react'
import React from 'react'

import { NotificationsProperties } from '../types'

import AssignedTask from './AssignedTask'
import CommentNotification from './Comments'
import ConfidenceCheckin from './ConfidenceCheckIn'
import SupportTeam from './SupportTeam'

interface CardNotificationProperties extends NotificationsProperties {
  type: string
}

const CardNotification = ({ type, ...rest }: CardNotificationProperties) => {
  switch (type) {
    case 'checkin':
      return <ConfidenceCheckin {...rest} />
    case 'taskAssign':
      return <AssignedTask {...rest} />
    case 'supportTeam':
      return <SupportTeam {...rest} />
    case 'taggedInComment':
      return <CommentNotification {...rest} />
    case 'commentOnKR':
      return <CommentNotification {...rest} />
    default:
      return <Box />
  }
}

export default CardNotification
