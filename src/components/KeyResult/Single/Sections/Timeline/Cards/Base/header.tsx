import { Avatar, Flex, Heading, SkeletonCircle, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { User } from 'src/components/User/types'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

import messages from './messages'

export interface KeyResultSectionTimelineCardCommentHeaderProperties {
  isLoaded?: boolean
  fullName?: User['fullName']
  picture?: User['picture']
  date?: Date
}

export const CardHeader = ({
  isLoaded,
  fullName,
  picture,
  date,
}: KeyResultSectionTimelineCardCommentHeaderProperties) => {
  isLoaded ??= true

  const [formattedDate, setDate] = useRelativeDate(date)
  const intl = useIntl()

  useEffect(() => {
    if (date) setDate(date)
  }, [date, setDate])

  return (
    <Flex alignItems="center" gridGap={4}>
      <SkeletonCircle isLoaded={isLoaded} w={12} h={12}>
        <Avatar name={fullName} src={picture} w={12} h={12} />
      </SkeletonCircle>

      <Flex direction="column" alignItems="center">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 130, 19)}>
          <Heading as="h4" fontSize="lg" color="black.800" fontWeight={700}>
            {fullName ?? intl.formatMessage(messages.unknownUser)}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 18)}>
          <Text color="gray.300" fontSize="sm" fontWeight={500}>
            {formattedDate}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}
