import { Box } from '@chakra-ui/react'
import React from 'react'

import { Notification } from '../types'

import AssignedTask from './AssignedTask'
import AssignedTaskInProject from './AssignedTaskInProject'
import CommentOnRoutineNotification from './CommentOnRoutine'
import CommentOnTaskInProject from './CommentOnTaskInProject'
import CommentNotification from './Comments'
import ConfidenceCheckin from './ConfidenceCheckIn'
import KrFeedback from './KrFeedback'
import KrOwner from './KrOwner'
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
    case 'commentOnRoutine':
      return <CommentOnRoutineNotification {...rest} />
    case 'mentionOnRoutine':
      return <CommentOnRoutineNotification {...rest} />
    case 'krOwner':
      return <KrOwner {...rest} />
    case 'krFeedback':
      return <KrFeedback {...rest} />
    case 'taskAssignInProject':
      return <AssignedTaskInProject {...rest} />
    case 'commentOnTask':
      return <CommentOnTaskInProject {...rest} />
    default:
      return <Box />
  }
}

export default CardNotification
