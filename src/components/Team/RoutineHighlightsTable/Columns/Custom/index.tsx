import { GridItem, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

import { CARD_TYPES } from 'src/components/Page/Team/Highlights/utils/card-types'
import { userRoutineData } from 'src/components/User/LastRetrospectiveAnswerOverview/LastRetrospectiveAnswer/wrapper'
import { useGetUserDetails } from 'src/components/User/hooks'
import { User } from 'src/components/User/types'

import useCustomColumnDefaultIcon from './column-icon'
import messages from './messages'

export interface RoutinesHighlightsTableCustomColumnProperties {
  userId: User['id']
  lastRoutineAnswerId?: userRoutineData['lastRoutineAnswerId']
  cardType: CARD_TYPES
}

const RoutinesHighlightsTableCustomColumn = ({
  userId,
  lastRoutineAnswerId,
  cardType,
}: RoutinesHighlightsTableCustomColumnProperties) => {
  const intl = useIntl()
  const CustomIcon = useCustomColumnDefaultIcon(cardType)
  const { data: user } = useGetUserDetails(userId)

  return cardType === CARD_TYPES.KRMEMBERS ? (
    <Text color="new-gray.700" fontSize={14}>
      {intl.formatMessage(messages.noKrsFlag)}
    </Text>
  ) : (
    <Link
      passHref
      href={`/explore/${
        user?.companies?.edges[0].node.id ?? ''
      }/?activeTab=retrospectiva&answerId=${lastRoutineAnswerId ?? ''}`}
    >
      <GridItem color="new-gray.800" fontWeight="500" fontSize="12px">
        {CustomIcon}
      </GridItem>
    </Link>
  )
}

export default RoutinesHighlightsTableCustomColumn
