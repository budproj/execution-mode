import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'

import useAnswerDetailed from '../hooks/getAnswerDetailed'

import AnswerContent from './Answers/AnswerContent'
import RoutinesOverview, { RoutinesOverviewProperties } from './RoutinesOverview'

interface AnswerContentProperties {
  answerQuery: string
  data: RoutinesOverviewProperties['data']
  teamId: Team['id']
  after: RoutinesOverviewProperties['after']
  before: RoutinesOverviewProperties['before']
  week: RoutinesOverviewProperties['week']
}

const RetrospectiveTabContentView = ({
  answerQuery,
  after,
  before,
  week,
  data,
  teamId,
}: AnswerContentProperties) => {
  const [answerId] = answerQuery.split('&')

  const { getAnswerDetailed } = useAnswerDetailed()

  useEffect(() => {
    getAnswerDetailed(answerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return answerId ? (
    <AnswerContent teamId={teamId} />
  ) : (
    <RoutinesOverview after={after} before={before} week={week} data={data} />
  )
}

export default RetrospectiveTabContentView
