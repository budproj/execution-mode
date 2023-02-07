import { GridItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import selectUser from 'src/state/recoil/user/selector'

import { UserRetrospectiveAnswerOverviewDataProperties } from '../hooks/use-get-last-retrospective-answer-overview'

import LastRetrospectiveAnswerOverviewEmptyState from './last-retrospective.empty-state'
import UserFeeling from './user-feeling'
import UserProductity from './user-productivity'
import UserRoadblock from './user-roadblock'

interface LastRetrospectiveAnswerProperties {
  userRoutineData?: UserRetrospectiveAnswerOverviewDataProperties
  onClick?: () => void
}

const LastRetrospectiveAnswer = ({
  userRoutineData,
  onClick,
}: LastRetrospectiveAnswerProperties) => {
  const user = useRecoilValue(selectUser(userRoutineData?.userId))
  const userCompanie = user?.companies?.edges[0].node.id ?? ''

  const redirectToURL = userRoutineData
    ? `/explore/${userCompanie}/?activeTab=retrospectiva&answerId=${userRoutineData?.lastRoutineAnswerId}`
    : '#'

  return userRoutineData ? (
    <IntlLink href={redirectToURL}>
      <GridItem
        gap="15px"
        display="flex"
        color="new-gray.800"
        fontWeight="500"
        fontSize="12px"
        onClick={onClick}
      >
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
