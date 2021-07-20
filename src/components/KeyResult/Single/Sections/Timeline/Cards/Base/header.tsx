import { Avatar, Flex, Heading, SkeletonCircle, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { User } from 'src/components/User/types'

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

  const intl = useIntl()

  return (
    <Flex alignItems="center" gridGap={4}>
      <SkeletonCircle isLoaded={isLoaded} w={12} h={12}>
        <Avatar name={fullName} src={picture} w={12} h={12} />
      </SkeletonCircle>

      <Flex direction="column">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 130, 19)}>
          <Heading as="h4" fontSize="lg" color="black.800" fontWeight={500}>
            {fullName ?? intl.formatMessage(messages.unknownUser)}
          </Heading>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          {...buildSkeletonMinSize(isLoaded, 100, 18)}
          mt={isLoaded ? 'inherit' : 2}
        >
          <Text color="new-gray.600" fontSize="md" fontWeight={300}>
            {intl.formatDate(date, {
              month: 'short',
              day: 'numeric',
              weekday: 'long',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}
