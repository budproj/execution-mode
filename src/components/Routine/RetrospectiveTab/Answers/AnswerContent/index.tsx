import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'

const AnswerContent = () => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)

  return (
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
  )
}

export default AnswerContent
