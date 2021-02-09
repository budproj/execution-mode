import { Avatar, Flex, Heading, SkeletonCircle, Text, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { User } from 'src/components/User/types'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

export interface KeyResultSectionTimelineCardCommentHeaderProperties {
  fullName?: User['fullName']
  picture?: User['picture']
  date?: Date
}

const KeyResultSectionTimelineCardCommentHeader = ({
  fullName,
  picture,
  date,
}: KeyResultSectionTimelineCardCommentHeaderProperties) => {
  const [formattedDate, setDate] = useRelativeDate(date)

  const isLoaded = Boolean(fullName) && Boolean(date)

  useEffect(() => {
    if (date) setDate(date)
  }, [date, setDate])

  return (
    <Flex alignItems="center" gridGap={4}>
      <SkeletonCircle isLoaded={isLoaded} w={10} h={10}>
        <Avatar name={fullName} src={picture} w={10} h={10} />
      </SkeletonCircle>

      <Flex direction="column" gridGap={1}>
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 130, 19)}>
          <Heading as="h4" fontSize="md" color="gray.700" fontWeight={700}>
            {fullName}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 18)}>
          <Text color="gray.300" fontSize="xs">
            {formattedDate}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionTimelineCardCommentHeader
