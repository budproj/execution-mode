import { Divider, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { Team } from 'src/components/Team/types'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'
import { hasCallToActionOnAnswerDetails } from 'src/state/recoil/routine/has-call-to-action'

import useAnswerDetailed from '../hooks/getAnswerDetailed'
import { useGetCommentsByEntity } from '../hooks/getCommentsByEntity'

import AnswerContent from './Answers/AnswerContent'
import { UserAnswer } from './Answers/AnswerContent/AnswerCards/UserAnswer'
import { COMMENT_DOMAIN } from './Answers/utils/constants'
import RoutineComments from './Comments'
import RoutineCommentsInput from './Comments/CommentInput/wrapper'
import RoutinesOverview, { RoutinesOverviewProperties } from './RoutinesOverview'

interface AnswerContentProperties {
  teamId: Team['id']
  after: RoutinesOverviewProperties['after']
  before: RoutinesOverviewProperties['before']
  week: RoutinesOverviewProperties['week']
  isLoaded?: boolean
}

const ScrollableItem = getScrollableItem()

const RetrospectiveTabContentView = ({
  after,
  before,
  week,
  teamId,
  isLoaded,
}: AnswerContentProperties) => {
  const router = useRouter()
  const intl = useIntl()

  const { getAnswerDetailed, isUserDetailedLoaded } = useAnswerDetailed()
  const { getCommentsByEntity, comments } = useGetCommentsByEntity()
  const setHasCallToAction = useSetRecoilState(hasCallToActionOnAnswerDetails)
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const answerQuery = router?.query?.answerId
  const answerId = Array.isArray(answerQuery) ? answerQuery[0] : answerQuery

  const entity = `${COMMENT_DOMAIN.routine}:${answerId ?? ''}`

  const element = document.querySelector('#comments-list')

  const scrollToShowLastComment = () => {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  const needCallToAction = useMemo(() => {
    return answerDetailed.answers.some((answer) => {
      if (answer.values) {
        if (
          answer.type === 'value_range' &&
          Number(answer.values[answer.values.length - 1].value) <= 3
        )
          return true

        if (
          answer.type === 'emoji_scale' &&
          Number(answer.values[answer.values.length - 1].value) <= 2
        )
          return true

        if (answer.type === 'road_block' && answer.values[answer.values.length - 2].value === 'y')
          return true
      }

      return false
    })
  }, [answerDetailed.answers])

  useEffect(() => {
    if (answerId && isLoaded) {
      getCommentsByEntity({ entity })
      setHasCallToAction(needCallToAction)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId, answerDetailed, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (answerId) {
        getAnswerDetailed(answerId, intl.locale)
      }

      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId, element, entity, isLoaded])

  return (
    <Stack>
      {answerId && answerDetailed.answers.length > 0 && (
        <>
          <UserAnswer user={answerDetailed.user} />
          <Flex w="100%" alignItems="center" justifyContent="center">
            <Divider textAlign="center" width="96%" borderColor="new-gray.400" />
          </Flex>
        </>
      )}
      <ScrollableItem maxH="750px" p="0 12px">
        {answerId && answerDetailed.answers.length > 0 ? (
          <div id="comments-list">
            <AnswerContent answerId={answerId} isLoaded={isLoaded && isUserDetailedLoaded} />
            <RoutineComments
              answerId={answerId}
              comments={comments}
              answerOwner={answerDetailed.user.firstName}
            />
            <RoutineCommentsInput
              showLastComment={scrollToShowLastComment}
              routineUser={answerDetailed.user.firstName}
              domainEntityId={answerId}
            />
          </div>
        ) : (
          <RoutinesOverview
            after={after}
            before={before}
            week={week}
            teamId={teamId}
            isLoaded={isLoaded}
          />
        )}
      </ScrollableItem>
    </Stack>
  )
}

export default RetrospectiveTabContentView
