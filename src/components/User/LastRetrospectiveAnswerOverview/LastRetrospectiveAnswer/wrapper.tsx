import { GridItem } from '@chakra-ui/react'
import React from 'react'

import { IntlLink } from 'src/components/Base'
import { useRoutineTab } from 'src/components/Routine/hooks/getRoutineTab'

import { useGetUserDetails } from '../../hooks'
import { User } from '../../types'

import LastRetrospectiveAnswerOverviewEmptyState from './last-retrospective.empty-state'
import UserFeeling from './user-feeling'
import Userproductivity from './user-productivity'
import UserRoadblock from './user-roadblock'

export interface userRoutineData {
  lastRoutineAnswerId?: string
  roadBlock?: string
  userId: User['id']
  productivity?: string
  feeling?: string
  onClick?: () => void
}

const LastRetrospectiveAnswer = ({
  feeling,
  userId,
  lastRoutineAnswerId,
  productivity,
  roadBlock,
  onClick,
}: userRoutineData) => {
  const { data: user } = useGetUserDetails(userId)
  const teamRetrospectiveTab = useRoutineTab()
  const companyId = user?.companies?.edges[0]?.node?.id ?? ''

  const redirectToURL = lastRoutineAnswerId
    ? `/explore/${companyId}/?activeTab=${teamRetrospectiveTab}&answerId=${lastRoutineAnswerId}`
    : '#'

  return lastRoutineAnswerId ? (
    <IntlLink href={redirectToURL}>
      <GridItem
        alignItems="center"
        gap="15px"
        display="flex"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
        onClick={onClick}
      >
        {feeling && <UserFeeling feeling={feeling} />}
        {productivity && <Userproductivity productivity={productivity} />}
        {roadBlock && <UserRoadblock roadblock={roadBlock} />}
      </GridItem>
    </IntlLink>
  ) : (
    <LastRetrospectiveAnswerOverviewEmptyState />
  )
}

export default LastRetrospectiveAnswer
