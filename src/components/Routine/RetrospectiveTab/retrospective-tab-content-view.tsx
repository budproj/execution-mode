import React, { useEffect } from 'react'

import { Team } from 'src/components/Team/types'

import useAnswerDetailed from '../hooks/getAnswerDetailed'
import { useGetCommentsByEntity } from '../hooks/getCommentsByEntity'

import AnswerContent from './Answers/AnswerContent'
import { COMMENT_DOMAIN } from './Answers/utils/constants'
import RoutinesOverview from './RoutinesOverview'
import { AnswerType } from './retrospective-tab-content'

interface AnswerContentProperties {
  answerQuery: string
  answers: AnswerType[]
  teamId: Team['id']
}

const RetrospectiveTabContentView = ({ answerQuery, answers, teamId }: AnswerContentProperties) => {
  const [queryId] = answerQuery.split('&')

  const answerId = queryId.split('=')[1]

  const entity = `${COMMENT_DOMAIN.routine}:${answerId}`

  const { getCommentsByEntity } = useGetCommentsByEntity()

  const { getAnswerDetailed } = useAnswerDetailed()

  useEffect(() => {
    getAnswerDetailed(answerId)
    getCommentsByEntity({ entity })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return answerId ? (
    <AnswerContent answerId={answerId} teamId={teamId} />
  ) : (
    <RoutinesOverview answers={answers} />
  )
}

export default RetrospectiveTabContentView
