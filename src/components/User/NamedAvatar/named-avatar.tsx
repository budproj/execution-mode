import { Flex, Box, Avatar, Text, SkeletonCircle, Skeleton } from '@chakra-ui/react'
import React, { ReactElement } from 'react'

export interface NamedAvatarProperties {
  isLoading?: boolean
  name?: string
  picture?: string
  team?: string
}

const NamedAvatar = ({ name, picture, team, isLoading }: NamedAvatarProperties): ReactElement => {
  const isLoadingIsUndefined = typeof isLoading === 'undefined'
  const isLoaded = isLoadingIsUndefined || !isLoading

  return (
    <Flex alignItems="center" justifyContent="flex-end" gridGap={15}>
      <SkeletonCircle isLoaded={isLoaded} size="50px">
        <Avatar name={name} src={picture} />
      </SkeletonCircle>

      <Box>
        <Skeleton isLoaded={isLoaded}>
          <Text color="gray.600" fontWeight={500}>
            {name}
          </Text>
        </Skeleton>

        <Skeleton isLoaded={isLoaded} height={isLoaded ? 'auto' : '10px'} mt={isLoaded ? 0 : '8px'}>
          <Text fontSize="sm" color="gray.600">
            {team}
          </Text>
        </Skeleton>
      </Box>
    </Flex>
  )
}

export default NamedAvatar
