import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'

export interface LastRetrospectiveAnswerColumnProperties {
  userId: string
  isLoaded?: boolean
  onClick: () => void
}

const LastRetrospectiveAnswer = ({
  userId,
  isLoaded,
  onClick,
}: LastRetrospectiveAnswerColumnProperties) => {
  return <LastRetrospectiveAnswerOverview isLoaded={isLoaded} userId={userId} onClick={onClick} />
}

export default LastRetrospectiveAnswer
