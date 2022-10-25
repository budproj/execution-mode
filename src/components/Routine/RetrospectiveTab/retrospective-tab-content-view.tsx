import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { Team } from 'src/components/Team/types'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import useAnswerDetailed from '../hooks/getAnswerDetailed'
import { useGetCommentsByEntity } from '../hooks/getCommentsByEntity'

import AnswerContent from './Answers/AnswerContent'
import { COMMENT_DOMAIN } from './Answers/utils/constants'
import RoutineComments from './Comments'
import RoutineCommentsInput from './Comments/CommentInput/wrapper'
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
  const { getCommentsByEntity } = useGetCommentsByEntity()
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const answerQuery = router?.query?.answerId
  const answerId = Array.isArray(answerQuery) ? answerQuery[0] : answerQuery

  const entity = `${COMMENT_DOMAIN.routine}:${answerId ?? ''}`

  useEffect(() => {
    if (answerId) getAnswerDetailed(answerId)
    getCommentsByEntity({ entity })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return (
    <Stack>
      <ScrollableItem maxH="750px">
        {answerId ? (
          <>
            <AnswerContent answerId={answerId} />
            <RoutineComments answerOwner={answerDetailed.user.firstName} />
          </>
        ) : (
          <RoutinesOverview after={after} before={before} week={week} teamId={teamId} />
        )}
      </ScrollableItem>
      {answerId && (
        <RoutineCommentsInput
          routineUser={answerDetailed.user.firstName}
          domainEntityId={answerId}
        />
      )}
    </Stack>
  )
}

export default RetrospectiveTabContentView
