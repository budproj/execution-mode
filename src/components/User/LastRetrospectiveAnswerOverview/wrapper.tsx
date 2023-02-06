import dynamic from 'next/dynamic'
import React from 'react'

import { User } from '../types'

import { useGetUserLastRetrospectiveAnswerOverview } from './hooks/use-get-last-retrospective-answer-overview'
import LastRetrospectiveAnswerSkeleton from './last-retrospective-answer.skeleton'

const DynamicLastRetrospectiveAnswer = dynamic(
  async () => import('./LastRetrospectiveAnswer/wrapper'),
)

interface LastRetrospectiveAnswerOverview {
  userId: User['id']
  isLoaded?: boolean
  onClick?: () => void
}

const LastRetrospectiveAnswerOverview = ({
  userId,
  isLoaded,
  onClick,
}: LastRetrospectiveAnswerOverview) => {
  const { data, isLoaded: lastRetrospectiveDataLoaded } =
    useGetUserLastRetrospectiveAnswerOverview(userId)

  const isLastRetrospectiveAnswerDataLoaded = isLoaded && lastRetrospectiveDataLoaded

  return isLastRetrospectiveAnswerDataLoaded ? (
    <DynamicLastRetrospectiveAnswer userRoutineData={data} onClick={onClick} />
  ) : (
    <LastRetrospectiveAnswerSkeleton />
  )
}

export default LastRetrospectiveAnswerOverview
