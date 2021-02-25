import { Flex, Box, Avatar, Text, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'

export interface NamedAvatarProperties {
  isLoading?: boolean
  name?: string
  picture?: string
  company?: string
}

const NamedAvatar = ({
  name,
  picture,
  company,
  isLoading,
}: NamedAvatarProperties): ReactElement => {
  const isLoadingIsUndefined = typeof isLoading === 'undefined'
  const isLoaded = isLoadingIsUndefined || !isLoading

  return (
    <Flex alignItems="center" gridGap={15}>
      <SkeletonCircle isLoaded={isLoaded} size="50px">
        <Avatar name={name} src={picture} />
      </SkeletonCircle>

      <Box textAlign="left">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 24)}>
          <Text color="gray.500" fontWeight={500}>
            {name}
          </Text>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          {...buildSkeletonMinSize(isLoaded, 60, 10)}
          mt={isLoaded ? 0 : '8px'}
        >
          <Text fontSize="sm" color="gray.500">
            {company}
          </Text>
        </Skeleton>
      </Box>
    </Flex>
  )
}

export default NamedAvatar
