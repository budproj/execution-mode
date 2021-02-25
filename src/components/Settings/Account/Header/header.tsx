import { Flex, Heading, Text, Skeleton } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import UserAvatar from 'src/components/User/Avatar'
import UserTeamTags from 'src/components/User/TeamTags'
import { User } from 'src/components/User/types'
import { userAtomFamily } from 'src/state/recoil/user'

export interface SettingsAccountHeader {
  userID?: User['id']
  loading?: boolean
}

const SettingsAccountHeader = ({ userID, loading }: SettingsAccountHeader) => {
  const user = useRecoilValue(userAtomFamily(userID))
  const isLoaded = !loading && Boolean(user)

  return (
    <Flex gridGap={4} alignItems="center">
      <UserAvatar size="xl" name={user?.fullName} src={user?.picture} />

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

        <UserTeamTags userID={userID} loading={loading} />
      </Flex>
    </Flex>
  )
}

export default SettingsAccountHeader
