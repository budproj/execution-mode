import { Box } from '@chakra-ui/react'
import React from 'react'

import { Notification } from '../types'

import AssignedTask from './AssignedTask'
import CommentNotification from './Comments'
import ConfidenceCheckin from './ConfidenceCheckIn'
import RoutineReminder from './RoutineReminder'
import SupportTeam from './SupportTeam'

const CardNotification = ({ ...rest }: Notification) => {
  switch (rest.type) {
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
    case 'routineReminder':
      return <RoutineReminder {...rest} />
    default:
      return <Box />
  }
}

export default CardNotification
