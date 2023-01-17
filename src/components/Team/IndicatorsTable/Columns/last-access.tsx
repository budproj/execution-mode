import { Box, GridItem, Text } from '@chakra-ui/react'
import React from 'react'

import { useGetLastAccess } from 'src/components/User/hooks/useLastAccess'

export interface LastAccessColumnProperties {
  userId: string
}

const LastAccess = ({ userId }: LastAccessColumnProperties) => {
  const { lastAccessSubtext, sinceDayLastAccess } = useGetLastAccess(userId)

  return (
    <GridItem
      display="flex"
      color="new-gray.800"
      fontWeight="500"
      fontSize="12px"
      flexDirection="column"
      gap="1px"
      alignItems="center"
    >
      <Box>
        <Text fontWeight="500">{sinceDayLastAccess()}</Text>
        <Text color="new-gray.600" fontWeight="400">
          {lastAccessSubtext()}
        </Text>
      </Box>
    </GridItem>
  )
}

export default LastAccess
