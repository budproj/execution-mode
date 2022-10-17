import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'

import useAnswerDetailed from '../hooks/getAnswerDetailed'

import AnswerContent from './Answers/AnswerContent'
import RoutinesOverview, { RoutinesOverviewProperties } from './RoutinesOverview'

interface AnswerContentProperties {
  teamId: Team['id']
  after: RoutinesOverviewProperties['after']
  before: RoutinesOverviewProperties['before']
  week: RoutinesOverviewProperties['week']
}

const RetrospectiveTabContentView = ({ after, before, week, teamId }: AnswerContentProperties) => {
  const router = useRouter()

  const { getAnswerDetailed } = useAnswerDetailed()
  const answerQuery = router?.query?.answerId
  const answerId = Array.isArray(answerQuery) ? answerQuery[0] : answerQuery

  useEffect(() => {
    if (answerId) getAnswerDetailed(answerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return answerId ? (
    <AnswerContent teamId={teamId} />
  ) : (
    <RoutinesOverview after={after} before={before} week={week} teamId={teamId} />
  )
}

export default RetrospectiveTabContentView
