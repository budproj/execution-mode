import { Box, GridItem, GridItemProps, SkeletonText, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useGetLastAccess } from 'src/components/User/hooks/useLastAccess'

import messages from './messages'

export interface LastAccessColumnProperties extends GridItemProps {
  lastDateAccess?: string
  isLoaded?: boolean
}

const LastAccess = ({ isLoaded, lastDateAccess, ...rest }: LastAccessColumnProperties) => {
  const intl = useIntl()

  const { lastAccessSubtext, sinceDayLastAccess } = useGetLastAccess(lastDateAccess)
  const isLastAccessLoaded = isLoaded

  return (
    <GridItem
      display="flex"
      alignItems="flex-start"
      color="new-gray.800"
      fontWeight="500"
      minW={28}
      w="100%"
      fontSize={14}
      flexDirection="column"
      {...rest}
    >
      {isLastAccessLoaded ? (
        lastDateAccess === 'never_accessed' ? (
          <Text fontWeight="medium">{intl.formatMessage(messages.neverAccessed)}</Text>
        ) : (
          <Box>
            <Text fontWeight="medium">{sinceDayLastAccess()}</Text>
            <Text color="new-gray.600">{lastAccessSubtext()}</Text>
          </Box>
        )
      ) : (
        <SkeletonText noOfLines={2} width={28} skeletonHeight={4} />
      )}
    </GridItem>
  )
}

export default LastAccess
