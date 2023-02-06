import dynamic from 'next/dynamic'
import React from 'react'

import { User } from '../types'

import LastRetrospectiveAnswerSkeleton from './last-retrospective-answer.skeleton'

const DynamicLastRetrospectiveAnswer = dynamic(
  async () => import('./LastRetrospectiveAnswer/wrapper'),
)

interface LastRetrospectiveAnswerOverview {
  isLoaded?: boolean
  lastRetrospetiveAnswerId?: string
  feeling?: string
  productity?: string
  userId: User['id']
  roadblock?: string
}

const LastRetrospectiveAnswerOverview = ({
  isLoaded,
  userId,
  feeling,
  lastRetrospetiveAnswerId,
  productity,
  roadblock,
}: LastRetrospectiveAnswerOverview) => {
  return isLoaded ? (
    <DynamicLastRetrospectiveAnswer
      userId={userId}
      feeling={feeling}
      lastRoutineAnswerId={lastRetrospetiveAnswerId}
      productivity={productity}
      roadBlock={roadblock}
    />
  ) : (
    <LastRetrospectiveAnswerSkeleton />
  )
}

export default LastRetrospectiveAnswerOverview
