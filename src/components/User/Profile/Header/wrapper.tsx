import { Flex, Heading, Text, Skeleton, AvatarProps } from '@chakra-ui/react'
import React from 'react'

import buildSkeletonMinSize from 'lib/chakra/build-skeleton-min-size'
import { UserEditableAvatar } from 'src/components/User/EditableAvatar/wrapper'
import { User } from 'src/components/User/types'

export interface UserProfileHeaderProperties {
  isLoaded: boolean
  userID?: User['id']
  userProps: Partial<User>
  canUpdate?: boolean
  onlyPicture?: boolean
  variantAvatar?: AvatarProps['variant']
  handleUpdatePicture?: () => Promise<any>
}

export const UserProfileHeader = ({
  userID,
  isLoaded,
  userProps,
  canUpdate,
  onlyPicture,
  variantAvatar,
  handleUpdatePicture,
}: UserProfileHeaderProperties) => {
  const { picture, fullName, role, id } = userProps

  return (
    <Flex gridGap={4} alignItems="center">
      <UserEditableAvatar
        isDisabled={!canUpdate}
        size="xl"
        userID={userID ?? id}
        name={fullName}
        picture={picture}
        variantAvatar={variantAvatar}
        handleUpdatePicture={handleUpdatePicture}
      />

      {!onlyPicture && (
        <Flex direction="column" gridGap={4}>
          <Flex direction="column" gridGap={1}>
            <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 180, 24)}>
              <Heading as="h2" color="black.900" fontSize="2xl" fontWeight={500}>
                {fullName}
              </Heading>
            </Skeleton>

            <Skeleton isLoaded={isLoaded} {...buildSkeletonMinSize(isLoaded, 220, 18)}>
              <Text color="gray.400" fontSize="lg" fontWeight={400}>
                {role}
              </Text>
            </Skeleton>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
