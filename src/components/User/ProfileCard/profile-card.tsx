import { Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { User } from 'src/components/User/types'
import selectUser from 'src/state/recoil/user/selector'

export interface UserProfileCardProperties {
  userID?: User['id']
}

const UserProfileCard = ({ userID }: UserProfileCardProperties) => {
  const user = useRecoilValue(selectUser(userID))

  const isUserLoaded = Boolean(user)

  return (
    <Flex p={1} flexDirection="column" gridGap={3}>
      {user?.picture && (
        <Image alt={user?.fullName} src={user?.picture} objectFit="cover" minH="192px" />
      )}

      <Box>
        <Skeleton isLoaded={isUserLoaded}>
          <Text color="black.900">{user?.fullName}</Text>
        </Skeleton>
        <Skeleton isLoaded={isUserLoaded}>
          <Text color="gray.200">{user?.role}</Text>
        </Skeleton>
      </Box>
    </Flex>
  )
}

export default UserProfileCard
