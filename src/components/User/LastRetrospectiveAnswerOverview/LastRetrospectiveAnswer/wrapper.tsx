import { GridItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { IntlLink } from 'src/components/Base'
import selectUser from 'src/state/recoil/user/selector'

import { User } from '../../types'
import { useGetUserLastRetrospectiveAnswerOverview } from '../hooks/use-get-last-retrospective-answer-overview'
import LastRetrospectiveAnswerOverviewEmptyState from '../last-retrospective.empty-state'

import LastRetrospectiveAnswerSkeleton from './last-retrospective-answer.skeleton'
import UserFeeling from './user-feeling'
import UserProductity from './user-productivity'
import UserRoadblock from './user-roadblock'

interface LastRetrospectiveAnswerProperties {
  userId: User['id']
  isLoaded?: boolean
}

const LastRetrospectiveAnswer = ({ userId, isLoaded }: LastRetrospectiveAnswerProperties) => {
  const { data: userRoutineData, isLoaded: lastRetrospectiveDataLoaded } =
    useGetUserLastRetrospectiveAnswerOverview(userId)
  const user = useRecoilValue(selectUser(userId))
  const userCompanie = user?.companies?.edges[0].node.id ?? ''

  const isLastRetrospectiveAnswerDataLoaded = isLoaded && lastRetrospectiveDataLoaded

  const redirectToURL = `/explore/${userCompanie}/?activeTab=retrospectiva&answerId=${
    userRoutineData?.lastRoutineAnswerId ?? ''
  }`

  return (
    <IntlLink href={redirectToURL}>
      {isLastRetrospectiveAnswerDataLoaded ? (
        userRoutineData ? (
          <GridItem gap="15px" display="flex" color="new-gray.800" fontWeight="500" fontSize="12px">
            <UserFeeling feeling={userRoutineData.feeling} />
            <UserProductity productivity={userRoutineData.productivity} />
            <UserRoadblock roadblock={userRoutineData.roadBlock} />
          </GridItem>
        ) : (
          <LastRetrospectiveAnswerOverviewEmptyState />
        )
      ) : (
        <LastRetrospectiveAnswerSkeleton numberOfElements={3} />
      )}
    </IntlLink>
  )
}

export default LastRetrospectiveAnswer
