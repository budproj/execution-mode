import { Box, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/history-answers'

type AnswerContent = {
  teamId: Team['id']
}

const AnswerContent = ({ teamId }: AnswerContent) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)

  return (
    <VStack align="flex-start" padding={10}>
      {answerDetailed.history.length > 0 && (
        <Box>
          <HistoryAnswers teamId={teamId} answers={answerDetailed.history} />
          {answerDetailed.answers.map((answer) => (
            <RoutineAnswerCard key={answer.id} answerData={answer} />
          ))}
        </Box>
      )}
    </VStack>
  )
}

export default AnswerContent
