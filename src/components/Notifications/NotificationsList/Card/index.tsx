import { Box } from '@chakra-ui/react'
import React from 'react'

import { NotificationsProperties } from '../types'

import AssignedTask from './AssignedTask'
import CommentNotification from './Comments'
import ConfidenceCheckin from './ConfidenceCheckIn'
import SupportTeam from './SupportTeam'

const CardNotification = ({ type, ...rest }: NotificationsProperties) => {
  switch (type) {
    case 'checkin':
      return <ConfidenceCheckin type={type} {...rest} />
    case 'taskAssign':
      return <AssignedTask {...rest} />
    case 'supportTeam':
      return <SupportTeam {...rest} />
    case 'taggedInComment':
      return <CommentNotification type={type} {...rest} />
    case 'commentOnKR':
      return <CommentNotification type={type} {...rest} />
    default:
      return <Box />
  }
}

export default CardNotification
