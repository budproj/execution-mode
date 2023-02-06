import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'
import { User } from 'src/components/User/types'

export interface LastRetrospectiveAnswerColumnProperties {
  isLoaded?: boolean
  lastRetrospetiveAnswerId?: string
  feeling?: string
  userId: User['id']
  productity?: string
  roadblock?: string
}

const LastRetrospectiveAnswer = ({
  isLoaded,
  lastRetrospetiveAnswerId,
  feeling,
  userId,
  productity,
  roadblock,
}: LastRetrospectiveAnswerColumnProperties) => {
  return (
    <LastRetrospectiveAnswerOverview
      userId={userId}
      isLoaded={isLoaded}
      lastRetrospetiveAnswerId={lastRetrospetiveAnswerId}
      feeling={feeling}
      productity={productity}
      roadblock={roadblock}
    />
  )
}

export default LastRetrospectiveAnswer
