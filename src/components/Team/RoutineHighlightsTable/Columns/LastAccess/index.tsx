import { Box, GridItem, GridItemProps, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { useGetUserDetails } from 'src/components/User/hooks'
import { useGetLastAccess } from 'src/components/User/hooks/useLastAccess'
import { User } from 'src/components/User/types'

import messages from '../messages'

export interface RoutinesHighlightsTableLastAccessColumnProperties extends GridItemProps {
  userId: User['id']
  isLoaded?: boolean
}

const RoutinesHighlightsTableLastAccessColumn = ({
  userId,
  ...rest
}: RoutinesHighlightsTableLastAccessColumnProperties) => {
  const intl = useIntl()
  const { data: userData } = useGetUserDetails(userId)
  const lastDateAccess = userData?.amplitude?.last_used

  const { lastAccessSubtext, sinceDayLastAccess } = useGetLastAccess(lastDateAccess)

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
      {lastDateAccess === 'never_accessed' ? (
        <Text fontWeight="medium">{intl.formatMessage(messages.neverAccessed)}</Text>
      ) : (
        <Box>
          <Text fontWeight="medium">{sinceDayLastAccess()}</Text>
          <Text color="new-gray.600">{lastAccessSubtext()}</Text>
        </Box>
      )}
    </GridItem>
  )
}

export default RoutinesHighlightsTableLastAccessColumn
