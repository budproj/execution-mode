import dynamic from 'next/dynamic'
import React from 'react'

import { User } from '../types'

import { useGetUserLastRetrospectiveAnswerOverview } from './hooks/use-get-last-retrospective-answer-overview'
import LastRetrospectiveAnswerOverviewEmptyState from './last-retrospective.empty-state'

const DynamicLastRetrospectiveAnswer = dynamic(
  async () => import('./LastRetrospectiveAnswer/wrapper'),
)

interface LastRetrospectiveAnswerOverview {
  userId: User['id']
  isLoaded?: boolean
}

const LastRetrospectiveAnswerOverview = ({ userId, isLoaded }: LastRetrospectiveAnswerOverview) => {
  const { data, isLoaded: lastRetrospectiveDataLoaded } =
    useGetUserLastRetrospectiveAnswerOverview(userId)

  return data ? (
    <DynamicLastRetrospectiveAnswer
      userRoutineData={data}
      isLoaded={isLoaded && lastRetrospectiveDataLoaded}
    />
  ) : (
    <LastRetrospectiveAnswerOverviewEmptyState />
  )
}

export default LastRetrospectiveAnswerOverview
