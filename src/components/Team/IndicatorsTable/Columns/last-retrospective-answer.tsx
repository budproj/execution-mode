import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'

export interface LastRetrospectiveAnswerColumnProperties {
  userId: string
  isLoaded?: boolean
}

const LastRetrospectiveAnswer = ({ userId, isLoaded }: LastRetrospectiveAnswerColumnProperties) => {
  return <LastRetrospectiveAnswerOverview isLoaded={isLoaded} userId={userId} />
}

export default LastRetrospectiveAnswer
