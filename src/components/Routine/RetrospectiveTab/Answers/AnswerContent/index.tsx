import { Box, Divider, VStack } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { answerDetailedAtom } from 'src/state/recoil/routine/answer'
import meAtom from 'src/state/recoil/user/me'
import selectUser from 'src/state/recoil/user/selector'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'
import { UserAnswer } from './AnswerCards/UserAnswer'

const AnswerContent = () => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const userID = useRecoilValue(meAtom)
  const user = useRecoilValue(selectUser(userID))

  return (
    <>
      {user ? <UserAnswer user={user} /> : undefined}

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
