import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'

import useAnswerDetailed from '../hooks/getAnswerDetailed'

import AnswerContent from './Answers/AnswerContent'
import RoutinesOverview from './RoutinesOverview'
import { AnswerType } from './retrospective-tab-content'

interface AnswerContentProperties {
  answerQuery: string
  answers: AnswerType[]
  teamId: Team['id']
}

const RetrospectiveTabContentView = ({ answerQuery, answers, teamId }: AnswerContentProperties) => {
  const [answerId] = answerQuery.split('&')

  const { getAnswerDetailed } = useAnswerDetailed()

  useEffect(() => {
    getAnswerDetailed(answerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return answerId ? <AnswerContent teamId={teamId} /> : <RoutinesOverview answers={answers} />
}

export default RetrospectiveTabContentView
