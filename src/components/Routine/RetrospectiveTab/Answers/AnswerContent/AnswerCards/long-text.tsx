import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'

import GraphicIcon from 'src/components/Icon/SmileIcon'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { routineAnswer } from '../../types'
import { themeColor } from '../../utils/contants'

import AnswerCardBase from './base/answer-card'

interface LongTextAnswerCardProperties {
  answerData: routineAnswer
}

const LongTextAnswerCard = ({ answerData }: LongTextAnswerCardProperties) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)

  const isDependentThat = answerDetailed.answers.find(
    (answer) => answer.id === answerData.conditional?.dependsOn,
  )

  const theme = themeColor(isDependentThat?.type ?? '')

  return (
    <AnswerCardBase isDependent={Boolean(answerData.conditional)}>
      <>
        {!answerData.conditional && (
          <Flex alignItems="center" gap={6} maxWidth={225}>
            <GraphicIcon desc="mudar" />
            <Text fontSize={14} color="new-gray.600">
              {answerData.heading}
            </Text>
          </Flex>
        )}

        <Box
          maxW={432}
          width="100%"
          bg="new-gray.100"
          borderRadius={6}
          fontSize={14}
          height="fit-content"
          p={4}
        >
          {answerData.conditional && (
            <Text color={theme} fontWeight="medium">
              {answerData.heading}
            </Text>
          )}

          <Text color="new-gray.900" fontWeight="normal">
            {answerData.value}
          </Text>
        </Box>
      </>
    </AnswerCardBase>
  )
}

export default LongTextAnswerCard
