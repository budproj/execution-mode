import { Box, Divider, Stack, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Team } from 'src/components/Team/types'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import RoutineComments from '../../Comments'
import RoutineCommentsInput from '../../Comments/CommentInput/wrapper'
import { AnswerType } from '../../retrospective-tab-content'

import RoutineAnswerCard from './AnswerCards'
import HistoryAnswers from './AnswerCards/HistoryAnswersCard/history-answers'

type AnswerContent = {
  teamId: Team['id']
  answerId: AnswerType['id']
}

const ScroolableVStack = styled(VStack)`
  max-height: 120vh;
  height: 100%;
  margin-right: 8px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    margin: 12px 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #b5c0db;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d9e2f7;
  }
`

const AnswerContent = ({ teamId, answerId }: AnswerContent) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)

  return (
    <Stack>
      <ScroolableVStack align="flex-start" padding={10}>
        {answerDetailed.history.length > 0 && (
          <Box>
            <HistoryAnswers teamId={teamId} answers={answerDetailed.history} />
            {answerDetailed.answers.map((answer) => {
              return <RoutineAnswerCard key={answer.id} answerData={answer} />
            })}
          </Box>
        )}
        <Divider />
        <RoutineComments />
      </ScroolableVStack>
      <RoutineCommentsInput routineUser={answerDetailed.user.firstName} domainEntityId={answerId} />
    </Stack>
  )
}

export default AnswerContent
