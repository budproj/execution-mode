import { Skeleton } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React from 'react'

import { User } from '../types'

import { useGetUserLastRetrospectiveAnswerOverview } from './hooks/use-get-last-retrospective-answer-overview'
import LastRetrospectiveAnswerOverviewEmptyState from './last-retrospective.empty-state'

const DynamicLastRetrospectiveAnswer = dynamic(async () => import('./last-retrospective-answer'))

interface LastRetrospectiveAnswerOverview {
  userId: User['id']
}

const LastRetrospectiveAnswerOverview = ({ userId }: LastRetrospectiveAnswerOverview) => {
  const { data, isLoaded } = useGetUserLastRetrospectiveAnswerOverview(userId)

  return (
    <Skeleton isLoaded={isLoaded}>
      {data ? (
        <DynamicLastRetrospectiveAnswer {...data} />
      ) : (
        <LastRetrospectiveAnswerOverviewEmptyState />
      )}
    </Skeleton>
  )
}

export default LastRetrospectiveAnswerOverview
