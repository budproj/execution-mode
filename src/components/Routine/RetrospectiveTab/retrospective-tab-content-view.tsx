import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { getScrollableItem } from 'src/components/Base/ScrollableItem'
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

const ScrollableItem = getScrollableItem()

const RetrospectiveTabContentView = ({ after, before, week, teamId }: AnswerContentProperties) => {
  const router = useRouter()

  const { getAnswerDetailed } = useAnswerDetailed()
  const answerQuery = router?.query?.answerId
  const answerId = Array.isArray(answerQuery) ? answerQuery[0] : answerQuery

  useEffect(() => {
    if (answerId) getAnswerDetailed(answerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return (
    <ScrollableItem maxH="750px">
      {answerId ? (
        <AnswerContent />
      ) : (
        <RoutinesOverview after={after} before={before} week={week} teamId={teamId} />
      )}
    </ScrollableItem>
  )
}

export default RetrospectiveTabContentView
