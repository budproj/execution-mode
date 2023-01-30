import { Box, GridItem, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'

import { useGetLastAccess } from 'src/components/User/hooks/useLastAccess'

export interface LastAccessColumnProperties {
  userId: string
  isLoaded?: boolean
}

const LastAccess = ({ userId, isLoaded }: LastAccessColumnProperties) => {
  const { lastAccessSubtext, sinceDayLastAccess, loading } = useGetLastAccess(userId)
  const isLastAccessLoaded = isLoaded && !loading

  return (
    <GridItem
      display="flex"
      alignItems="flex-start"
      color="new-gray.800"
      fontWeight="500"
      fontSize="12px"
      minW={28}
      w="100%"
      flexDirection="column"
    >
      {isLastAccessLoaded ? (
        <Box>
          <Text fontWeight="500">{sinceDayLastAccess()}</Text>
          <Text color="new-gray.600" fontWeight="400">
            {lastAccessSubtext()}
          </Text>
        </Box>
      ) : (
        <SkeletonText noOfLines={2} width={28} skeletonHeight={4} />
      )}
    </GridItem>
  )
}

export default LastAccess
