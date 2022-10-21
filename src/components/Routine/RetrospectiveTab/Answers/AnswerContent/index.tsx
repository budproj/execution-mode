import { Box, Divider, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'
import { UserAnswer } from './AnswerCards/UserAnswer'

const AnswerContent = () => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)

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
    </>
  )
}

export default AnswerContent
