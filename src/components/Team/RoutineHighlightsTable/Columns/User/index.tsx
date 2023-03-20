import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'

export interface RoutinesHighlightsTableUserColumnProperties {
  userId: User['id']
}

const RoutinesHighlightsTableUserColumn = ({
  userId,
}: RoutinesHighlightsTableUserColumnProperties) => {
  const { data: user } = useGetUserDetails(userId)

  return (
    <Link passHref href={`/profile/${userId}`}>
      <Flex color="new-gray.800" fontWeight="500" fontSize="12px">
        <Avatar src={user?.picture} width="50px" height="50px" marginRight="20px" />
        <Box>
          <Text color="new-gray.900" fontWeight={400} fontSize="16px">
            {user?.fullName}
          </Text>
          <Text color="new-gray.600" fontWeight={400} fontSize="14px">
            {user?.role}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}

export default RoutinesHighlightsTableUserColumn
