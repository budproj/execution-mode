import { Divider, Flex, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'

import { getScrollableItem } from 'src/components/Base/ScrollableItem'
import { Team } from 'src/components/Team/types'

import RoutineComments from '../../Comments'
import RoutineCommentsInput from '../../Comments/CommentInput/wrapper'
import RoutinesOverview, { RoutinesOverviewProperties } from '../../RoutinesOverview'
import AnswerContent from '../AnswerContent'
import { UserAnswer } from '../AnswerContent/AnswerCards/UserAnswer'

import { useLogic } from './use-logic'

interface AnswerContentProperties {
  teamId: Team['id']
  after: RoutinesOverviewProperties['after']
  before: RoutinesOverviewProperties['before']
  week: RoutinesOverviewProperties['week']
  isLoaded?: boolean
}

const ScrollableItem = getScrollableItem()

const AnswerViewContent = ({ after, before, week, teamId, isLoaded }: AnswerContentProperties) => {
  const router = useRouter()
  const intl = useIntl()

  const { answerId, answerDetailed, isUserDetailedLoaded, comments } = useLogic({
    router,
    intl,
  })

  const element = document.querySelector('#comments-list')
  const scrollToShowLastComment = () => {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }

  useEffect(() => {
    if (!isUserDetailedLoaded && element) {
      element.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }
  }, [element, isUserDetailedLoaded])

  return (
    <Stack>
      {answerId && answerDetailed && answerDetailed.answers.length > 0 && (
        <>
          <UserAnswer user={answerDetailed.user} isLoaded={!isUserDetailedLoaded} />
          <Flex w="100%" alignItems="center" justifyContent="center">
            <Divider textAlign="center" width="96%" borderColor="new-gray.400" />
          </Flex>
        </>
      )}
      <ScrollableItem maxH="750px" p="0 12px">
        {answerDetailed && answerId && answerDetailed.answers.length > 0 ? (
          <div id="comments-list">
            <AnswerContent
              teamId={teamId}
              answerId={answerId}
              answerDetailed={answerDetailed}
              isLoaded={!isUserDetailedLoaded}
            />
            <RoutineComments comments={comments} answerOwner={answerDetailed.user.firstName} />
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

export default AnswerViewContent
