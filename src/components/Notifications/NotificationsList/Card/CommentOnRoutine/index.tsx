import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import regexifyString from 'regexify-string'

import { CalendarColored } from 'src/components/Icon'
import { NOTIFICATIONS_TYPE } from 'src/components/Notifications/constants'
import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab'

import { Notification } from '../../types'
import BaseCardNotification from '../Base'

import messages from './messages'

const CommentOnRoutineNotification = ({ properties, timestamp, isRead, type }: Notification) => {
  const intl = useIntl()
  const { push, pathname } = useRouter()
  const routineTabName = useRoutineTab()

  const typeCommentNotificationMessage =
    type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_ROUTINE
      ? intl.formatMessage(messages.commentOnMyRoutineNotification)
      : intl.formatMessage(messages.taggedOnCommentOnRoutineNotification)

  const commentText = regexifyString({
    pattern: /@\[[\w \u00C0-\u00FF-]+]\([\da-f-]+\)/g,
    decorator: (match) => {
      const regex = /@\[([\w \u00C0-\u00FF-]+)]\(([\da-f-]+)\)/
      const [_, name] = regex.exec(match) ?? [undefined, '', '']

      return (
        <Text as="span" color="brand.500" cursor="pointer">
          {name}
        </Text>
      )
    },
    input: properties.comment?.content ?? '',
  })

  const isExplorePage = pathname === '/explore' || pathname.startsWith('/explore/')

  const answerLink = properties.routine
    ? `${isExplorePage ? '/' : 'explore/'}${
        properties.routine.companyId
      }?activeTab=${routineTabName}&answerId=${properties.routine?.answerId}`
    : '#'

  console.log({ answerLink })

  return (
    <BaseCardNotification
      describeBadgeAvatarIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_KR
          ? messages.commentOnMyRoutineNotification
          : messages.taggedOnCommentOnRoutineNotification
      }
      timestamp={timestamp}
      isRead={isRead}
      sender={properties.sender}
      badgeIcon={
        type === NOTIFICATIONS_TYPE.COMMENT_ON_MY_ROUTINE
          ? NOTIFICATIONS_TYPE.COMMENT_ON_MY_ROUTINE
          : NOTIFICATIONS_TYPE.MENTION_ON_MY_ROUTINE
      }
      handleClick={async () => push(answerLink)}
    >
      <Heading display="flex" width="100%" justifyContent="space-between" textAlign="left">
        <Box display="flex" alignItems="flex-start" justifyContent="center" flexDir="column">
          <Text fontSize={16} fontWeight="bold" color="new-gray.800">
            {properties.sender.name}
          </Text>
          <Text fontSize={14} fontWeight="normal" color="new-gray.700">
            {typeCommentNotificationMessage}
          </Text>
        </Box>
      </Heading>
      <Flex alignItems="center">
        <Box
          marginRight="10px"
          background="red.100"
          padding="5px"
          borderRadius="50%"
          display="flex"
        >
          <CalendarColored
            desc={intl.formatMessage(messages.calendarIconDescription)}
            width="18px"
            height="18px"
          />
        </Box>
        <Text color="new-gray.800" fontWeight="600">
          {intl.formatMessage(messages.weekRetrospective)}
        </Text>
      </Flex>
      <Text textAlign="left" fontSize={14} position="relative" fontWeight="400" color="#525F7F">
        {commentText}
      </Text>
    </BaseCardNotification>
  )
}

export default CommentOnRoutineNotification
