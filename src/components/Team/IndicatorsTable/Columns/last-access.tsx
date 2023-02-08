import { Box, GridItem, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useGetLastAccess } from 'src/components/User/hooks/useLastAccess'

import messages from './messages'

export interface LastAccessColumnProperties {
  userId: string
  lastDateAccess?: string
  isLoaded?: boolean
}

const LastAccess = ({ userId, isLoaded, lastDateAccess }: LastAccessColumnProperties) => {
  const intl = useIntl()

  const { lastAccessSubtext, sinceDayLastAccess } = useGetLastAccess(userId, lastDateAccess)
  const isLastAccessLoaded = isLoaded

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
        lastDateAccess === 'never_accessed' ? (
          <Text fontWeight="medium" fontSize={14}>
            {intl.formatMessage(messages.neverAccessed)}
          </Text>
        ) : (
          <Box>
            <Text fontWeight="medium" fontSize={14}>
              {sinceDayLastAccess()}
            </Text>
            <Text color="new-gray.600" fontSize={14}>
              {lastAccessSubtext()}
            </Text>
          </Box>
        )
      ) : (
        <SkeletonText noOfLines={2} width={28} skeletonHeight={4} />
      )}
    </GridItem>
  )
}

export default LastAccess
