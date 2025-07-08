import { Box, Divider, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CustomMenuOptions, { Option } from 'src/components/Base/MenuOptions'
import { useDeleteAnswer } from 'src/components/Routine/hooks/new/use-delete-answer'
import { commentsAtom } from 'src/state/recoil/comments/comments'
import meAtom from 'src/state/recoil/user/me'

import { AnswerDetails, AnswerType } from '../../types'
import messages from '../messages'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'

type AnswerContent = {
  answerId: AnswerType['id']
  answerDetailed: AnswerDetails
  isLoaded?: boolean
}

const AnswerContent = ({ answerId, answerDetailed, isLoaded }: AnswerContent) => {
  const intl = useIntl()

  const [answerDetailedFormatted] = useState<AnswerDetails>({
    ...answerDetailed,
    answers: answerDetailed.answers.map((answer) => {
      const dependsThat = answerDetailed.answers.find(
        (answerDepend) => answerDepend.id === answer.conditional?.dependsOn,
      )

      return {
        ...answer,
        dependsThat,
      }
    }),
  })

  const userID = useRecoilValue(meAtom)
  const setComments = useSetRecoilState(commentsAtom)

  const { deleteAnswer } = useDeleteAnswer()

  const hasPermission = userID === answerDetailed.user.id

  useEffect(() => {
    setComments([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  const menuOptions: Option[] = [
    {
      value: intl.formatMessage(messages.firstMenuOption),
      onSelect: async () => deleteAnswer(answerId),
    },
  ]

  return (
    <>
      <VStack align="flex-start" px={4} py={10}>
        {answerDetailedFormatted.history.length > 0 && (
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
            <HistoryAnswers isLoaded={isLoaded} answers={answerDetailedFormatted.history} />
            {answerDetailedFormatted.answers.map((answer) => {
              return (
                <RoutineAnswerCard
                  key={answer.id}
                  answerData={answer}
                  userThatAnswered={answerDetailedFormatted.user}
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
