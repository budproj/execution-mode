import { Box, Divider, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CustomMenuOptions, { Option } from 'src/components/Base/MenuOptions'
import { useDeleteRoutineAnswer } from 'src/components/Routine/hooks/deleteAnswer/delete-routine-answer'
import { commentsAtom } from 'src/state/recoil/comments/comments'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { myselfAtom } from '../../../../../state/recoil/shared/atoms'
import { AnswerType } from '../../retrospective-tab-content'
import messages from '../messages'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'

type AnswerContent = {
  answerId: AnswerType['id']
  isLoaded?: boolean
}

const AnswerContent = ({ answerId, isLoaded }: AnswerContent) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const setComments = useSetRecoilState(commentsAtom)

  const intl = useIntl()

  const myself = useRecoilValue(myselfAtom)

  const { deleteRoutineAnswer } = useDeleteRoutineAnswer()

  const hasPermission = myself?.id === answerDetailed.user.id

  useEffect(() => {
    setComments([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  const menuOptions: Option[] = [
    {
      value: intl.formatMessage(messages.firstMenuOption),
      onSelect: async () => deleteRoutineAnswer(answerId),
    },
  ]

  return (
    <>
      <VStack align="flex-start" px={4} py={10}>
        {answerDetailed.history.length > 0 && (
          <Box position="relative">
            {hasPermission && (
              <CustomMenuOptions
                options={menuOptions}
                right={-14}
                legend={intl.formatMessage(messages.actionsMenuDescription)}
                position="absolute"
                gap={1}
              />
            )}
            <HistoryAnswers isLoaded={isLoaded} answers={answerDetailed.history} />
            {answerDetailed.answers.map((answer) => {
              return (
                <RoutineAnswerCard
                  key={answer.id}
                  answerData={answer}
                  userThatAnswered={answerDetailed.user}
                  isLoaded={isLoaded}
                />
              )
            })}
          </Box>
        )}
      </VStack>

      <Divider borderColor="new-gray.400" />
    </>
  )
}

export default AnswerContent
