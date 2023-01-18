import React from 'react'

import LastRetrospectiveAnswerOverview from 'src/components/User/LastRetrospectiveAnswerOverview/wrapper'

export interface LastRetrospectiveAnswerColumnProperties {
  userId: string
}

const LastRetrospectiveAnswer = ({ userId }: LastRetrospectiveAnswerColumnProperties) => {
  return <LastRetrospectiveAnswerOverview userId={userId} />
}

export default LastRetrospectiveAnswer
