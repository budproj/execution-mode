import React from 'react'

import AnswerContent from './Answers/AnswerContent'
import RoutinesOverview from './RoutinesOverview'
import { AnswerType } from './retrospective-tab-content'

interface AnswerContentProperties {
  answerQuery: string
  answers: AnswerType[]
}

const RetrospectiveTabContentView = ({ answerQuery, answers }: AnswerContentProperties) => {
  const [answerId] = answerQuery.split('&')

  // TODO: change
  const answerDetails = { id: 2 }

  return answerId ? (
    <AnswerContent answer={answerDetails} />
  ) : (
    <RoutinesOverview answers={answers} />
  )
}

export default RetrospectiveTabContentView
