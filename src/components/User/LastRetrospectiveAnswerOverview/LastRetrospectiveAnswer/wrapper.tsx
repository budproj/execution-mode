import { GridItem } from '@chakra-ui/react'
import React from 'react'

import { IntlLink } from 'src/components/Base'

import { useGetUserDetails } from '../../hooks'
import { UserRetrospectiveAnswerOverviewDataProperties } from '../hooks/use-get-last-retrospective-answer-overview'

import LastRetrospectiveAnswerOverviewEmptyState from './last-retrospective.empty-state'
import UserFeeling from './user-feeling'
import UserProductity from './user-productivity'
import UserRoadblock from './user-roadblock'

interface LastRetrospectiveAnswerProperties {
  userRoutineData?: UserRetrospectiveAnswerOverviewDataProperties
}

const LastRetrospectiveAnswer = ({ userRoutineData }: LastRetrospectiveAnswerProperties) => {
  const { data: user, loading } = useGetUserDetails(userRoutineData?.userId ?? '')
  const companyId = user?.companies?.edges[0]?.node?.id ?? ''

  const redirectToURL = userRoutineData
    ? `/explore/${companyId}/?activeTab=retrospectiva&answerId=${userRoutineData?.lastRoutineAnswerId}`
    : '#'

  return userRoutineData && !loading ? (
    <IntlLink href={redirectToURL}>
      <GridItem gap="15px" display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
        <UserFeeling feeling={userRoutineData.feeling} />
        <UserProductity productivity={userRoutineData.productivity} />
        <UserRoadblock roadblock={userRoutineData.roadBlock} />
      </GridItem>
    </IntlLink>
  ) : (
    <LastRetrospectiveAnswerOverviewEmptyState />
  )
}

export default LastRetrospectiveAnswer
