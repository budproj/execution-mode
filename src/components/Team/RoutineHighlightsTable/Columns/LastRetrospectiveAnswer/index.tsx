import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'
import { User } from 'src/components/User/types'

export interface RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties {
  lastRetrospetiveAnswerId?: string
  feeling?: string
  userId: User['id']
  productivity?: string
  roadBlock?: string
  onClick?: () => void
}

const RoutinesHighlightsTableLastRetrospectiveAnswerColumn = ({
  lastRetrospetiveAnswerId,
  feeling,
  userId,
  productivity,
  roadBlock,
  onClick,
}: RoutinesHighlightsTableLastRetrospectiveAnswerColumnProperties) => {
  return (
    <LastRetrospectiveAnswerOverview
      isLoaded
      userId={userId}
      lastRetrospetiveAnswerId={lastRetrospetiveAnswerId}
      feeling={feeling}
      productivity={productivity}
      roadblock={roadBlock}
      onClick={onClick}
    />
  )
}

export default RoutinesHighlightsTableLastRetrospectiveAnswerColumn
