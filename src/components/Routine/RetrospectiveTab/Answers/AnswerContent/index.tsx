import { Box, Divider, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { commentsAtom } from 'src/state/recoil/comments/comments'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { AnswerType } from '../../retrospective-tab-content'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'
import { UserAnswer } from './AnswerCards/UserAnswer'

type AnswerContent = {
  answerId: AnswerType['id']
}

const AnswerContent = ({ answerId }: AnswerContent) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const setComments = useSetRecoilState(commentsAtom)

  useEffect(() => {
    setComments([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerId])

  return (
    <>
      <UserAnswer user={answerDetailed.user} />

      <Divider borderColor="new-gray.400" />

      <VStack align="flex-start" padding={10}>
        {answerDetailed.history.length > 0 && (
          <Box>
            <HistoryAnswers answers={answerDetailed.history} />
            {answerDetailed.answers.map((answer) => {
              return <RoutineAnswerCard key={answer.id} answerData={answer} />
            })}
          </Box>
        )}
      </VStack>
      <Divider />
    </>
  )
}

export default AnswerContent
