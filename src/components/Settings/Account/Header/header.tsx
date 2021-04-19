import { Flex, Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { UserEditableAvatar } from 'src/components/User/EditableAvatar/wrapper'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

export interface SettingsAccountHeader {
  isLoaded: boolean
  userID?: User['id']
}

const SettingsAccountHeader = ({ userID, isLoaded }: SettingsAccountHeader) => {
  const user = useRecoilValue(userAtomFamily(userID))

  return (
    <Flex gridGap={4} alignItems="center">
      <UserEditableAvatar size="xl" name={user?.fullName} picture={user?.picture} />

      <Flex direction="column" gridGap={4}>
        <Flex direction="column" gridGap={1}>
          <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 180, 24)}>
            <Heading as="h2" color="black.900" fontSize="xl" fontWeight={500}>
              {user?.fullName}
            </Heading>
          </Skeleton>

          <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 220, 18)}>
            <Text color="gray.400" fontSize="md" fontWeight={400}>
              {user?.role}
            </Text>
          </Skeleton>
        </Flex>

        <UserTeamTags userID={userID} isLoaded={isLoaded} />
      </Flex>
    </Flex>
  )
}

export default SettingsAccountHeader
