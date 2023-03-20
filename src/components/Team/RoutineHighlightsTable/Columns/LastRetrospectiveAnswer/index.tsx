import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'
import { User } from 'src/components/User/types'

export interface RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties {
  isLoaded?: boolean
  lastRetrospetiveAnswerId?: string
  feeling?: string
  userId: User['id']
  productivity?: string
  roadblock?: string
  onClick?: () => void
}

const RoutinesHighlightsTableLastRetrospectiveAnswerColumn = ({
  isLoaded,
  lastRetrospetiveAnswerId,
  feeling,
  userId,
  productivity,
  roadblock,
  onClick,
}: RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties) => {
  return (
    <LastRetrospectiveAnswerOverview
      userId={userId}
      isLoaded={isLoaded}
      lastRetrospetiveAnswerId={lastRetrospetiveAnswerId}
      feeling={feeling}
      productivity={productivity}
      roadblock={roadblock}
      onClick={onClick}
    />
  )
}

export default RoutinesHighlightsTableLastRetrospectiveAnswerColumn
