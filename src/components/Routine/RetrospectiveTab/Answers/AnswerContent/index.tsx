import { Box, Divider, VStack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import CustomMenuOptions, { Option } from 'src/components/Base/MenuOptions'
import { useDeleteAnswerMutation } from 'src/components/Routine/hooks/new/use-delete-answer'
import { commentsAtom } from 'src/state/recoil/comments/comments'
import meAtom from 'src/state/recoil/user/me'

import { AnswerDetails, AnswerType } from '../../types'
import messages from '../messages'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'

type AnswerContent = {
  teamId: string
  answerId: AnswerType['id']
  answerDetailed: AnswerDetails
  isLoaded?: boolean
}

const AnswerContent = ({ teamId, answerId, answerDetailed, isLoaded }: AnswerContent) => {
  const intl = useIntl()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [answerDetailedFormatted, setAnswerDetailedFormatted] = useState<
    AnswerDetails | undefined
  >()

  useEffect(() => {
    setAnswerDetailedFormatted({
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
  }, [answerDetailed])

  const userID = useRecoilValue(meAtom)
  const setComments = useSetRecoilState(commentsAtom)

  const { mutate: deleteAnswer } = useDeleteAnswerMutation()

  const hasPermission = userID === answerDetailed.user.id

  useEffect(() => {
    setComments([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  const menuOptions: Option[] = [
    {
      value: intl.formatMessage(messages.firstMenuOption),
      onSelect: async () => {
        deleteAnswer(answerId)
        setTimeout(
          async () => queryClient.invalidateQueries({ queryKey: [`routines:getAnswer:${teamId}`] }),
          2000,
        )
        router.push(
          {
            query: {
              ...router.query,
              answerId: undefined,
            },
          },
          undefined,
          { shallow: true },
        )
      },
    },
  ]

  return (
    <>
      <VStack align="flex-start" px={4} py={10}>
        {answerDetailedFormatted && answerDetailedFormatted.history.length > 0 && (
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
