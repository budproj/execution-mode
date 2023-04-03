import { Box } from '@chakra-ui/react'
import React from 'react'

import CheckedIcon from 'src/components/Icon/Checked/checked'
import ChevronDownCircleIcon from 'src/components/Icon/ChevronDown/chvron-down-circle'
import CommentIcon from 'src/components/Icon/Comment'
import PauseIcon from 'src/components/Icon/Pause'
import TaggedIcon from 'src/components/Icon/Tagged'
import TeamIcon from 'src/components/Icon/Team'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'

interface BadgeIconProperties {
  typeNotification: NOTIFICATIONS_TYPE
  desc: string
}

const BadgeIcon = ({ typeNotification, desc, ...rest }: BadgeIconProperties) => {
  const Icons = new Map([
    [
      NOTIFICATIONS_TYPE.LOW_CONFIDENCE,
      <ChevronDownCircleIcon desc={desc} {...rest} key={desc} h="1.25em" w="1.25 em" />,
    ],
    [
      NOTIFICATIONS_TYPE.CONFIDENCE_BARRIER,
      <PauseIcon key={desc} desc={desc} h="1.4em" w="1.4em" stroke="white" />,
    ],
    [
      NOTIFICATIONS_TYPE.ASSIGNED_TASK,
      <CheckedIcon key={desc} desc={desc} h="1.4em" w="1.4em" fill="none" stroke="none" />,
    ],
    [
      NOTIFICATIONS_TYPE.ADD_SUPPORT_TEAM,
      <TeamIcon key={desc} desc={desc} h="1.4em" w="1.4em" fill="none" stroke="none" />,
    ],
    [
      NOTIFICATIONS_TYPE.TAGGED_COMMENT,
      <TaggedIcon key={desc} desc={desc} h="1.4em" w="1.4em" fill="none" stroke="none" />,
    ],
    [
      NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR,
      <CommentIcon key={desc} desc={desc} width="4.5em" height="4.5em" fill="none" stroke="none" />,
    ],
    [
      NOTIFICATIONS_TYPE.COMMENT_ON_MY_ROUTINE,
      <CommentIcon key={desc} desc={desc} width="4.5em" height="4.5em" fill="none" stroke="none" />,
    ],
    [
      NOTIFICATIONS_TYPE.MENTION_ON_MY_ROUTINE,
      <TaggedIcon key={desc} desc={desc} h="1.4em" w="1.4em" fill="none" stroke="none" />,
    ],
  ])

  return <Box>{Icons.get(typeNotification)}</Box>
}

export default BadgeIcon
