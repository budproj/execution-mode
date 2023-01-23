import { GridItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import selectUser from 'src/state/recoil/user/selector'

import { UserRetrospectiveAnswerOverviewDataProperties } from '../hooks/use-get-last-retrospective-answer-overview'

import LastRetrospectiveAnswerSkeleton from './last-retrospective-answer.skeleton'
import UserFeeling from './user-feeling'
import UserProductity from './user-productivity'
import UserRoadblock from './user-roadblock'

interface LastRetrospectiveAnswerProperties {
  userRoutineData: UserRetrospectiveAnswerOverviewDataProperties
  isLoaded?: boolean
}

const LastRetrospectiveAnswer = ({
  userRoutineData,
  isLoaded,
}: LastRetrospectiveAnswerProperties) => {
  const user = useRecoilValue(selectUser(userRoutineData.userId))
  const userCompanie = user?.companies?.edges[0].node.id ?? ''

  const redirectToURL = `/explore/${userCompanie}/?activeTab=retrospectiva&answerId=${userRoutineData.lastRoutineAnswerId}`

  return (
    <IntlLink href={redirectToURL}>
      {isLoaded ? (
        <GridItem gap="15px" display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
          <UserFeeling feeling={userRoutineData.feeling} />
          <UserProductity productivity={userRoutineData.productivity} />
          <UserRoadblock roadblock={userRoutineData.roadBlock} />
        </GridItem>
      ) : (
        <LastRetrospectiveAnswerSkeleton numberOfElements={3} />
      )}
    </IntlLink>
  )
}

export default LastRetrospectiveAnswer
