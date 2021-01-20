import { Avatar, Flex, Heading, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { ProgressReport } from 'src/components/KeyResult/types'
import { User } from 'src/components/User/types'
import useRelativeDate from 'src/state/hooks/useRelativeDate'

export interface KeyResultSectionCommentsCommentHeadProperties {
  user?: User
  createdAt?: ProgressReport['createdAt']
}

const KeyResultSectionCommentsCommentHead = ({
  user,
  createdAt,
}: KeyResultSectionCommentsCommentHeadProperties) => {
  const [formattedDate] = useRelativeDate(createdAt)
  const isLoaded = Boolean(user)

  return (
    <Flex alignItems="center" gridGap={4}>
      <SkeletonCircle isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 50, 50)}>
        <Avatar name={user?.fullName} src={user?.picture} />
      </SkeletonCircle>

      <Flex direction="column" gridGap={1}>
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 200, 24)}>
          <Heading as="h4" fontSize="18px" fontWeight={500}>
            {user?.fullName}
          </Heading>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 18)}>
          <Text fontSize="16px" color="gray.200">
            {formattedDate}
          </Text>
        </Skeleton>
      </Flex>
    </Flex>
  )
}

export default KeyResultSectionCommentsCommentHead
