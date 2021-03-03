import { Flex, Box, Avatar, Text, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { User } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

export interface NamedAvatarProperties {
  userID?: User['id']
  isLoading?: boolean
}

const NamedAvatar = ({ userID, isLoading }: NamedAvatarProperties): ReactElement => {
  const user = useRecoilValue(selectUser(userID))

  const isLoaded = Boolean(user) || !isLoading

  return (
    <Flex alignItems="center" gridGap={15}>
      <SkeletonCircle isLoaded={isLoaded} size="50px">
        <Avatar name={user?.fullName} src={user?.picture} />
      </SkeletonCircle>

      <Box textAlign="left">
        <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 100, 24)}>
          <Text color="gray.500" fontWeight={500}>
            {user?.fullName}
          </Text>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          {...buildSkeletonMinSize(isLoaded, 60, 10)}
          mt={isLoaded ? 0 : '8px'}
        >
          <Text fontSize="sm" color="gray.500">
            {user?.companies?.[0]?.name}
          </Text>
        </Skeleton>
      </Box>
    </Flex>
  )
}

export default NamedAvatar
