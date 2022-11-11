import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import { AlertIcon, SmileIcon } from 'src/components/Icon'
import { useGetEmoji } from 'src/components/Routine/hooks'
import { User } from 'src/components/User/types'

import { routineAnswer } from '../../../types'
import AnswerCardBase from '../base/answer-card'
import RoutineChart from '../base/charts'
import WrapperAnswerTitle from '../base/wrapper-answer-title'

import messages from './messages'

interface FeelingAnswerCardProperties {
  answerData: routineAnswer
  user: Partial<User>
}

const CustomAnswerBox = styled(Box)`
  @media (min-width: 1220px) {
    gap: 52px;
  }
`

const FeelingAnswerCard = ({ answerData, user }: FeelingAnswerCardProperties) => {
  const { getEmoji } = useGetEmoji()

  const intl = useIntl()

  const chartData = answerData.values ?? []

  const actualFeeling = chartData[chartData.length - 1]

  const hasCallToAction = actualFeeling.value <= '2'

  return (
    <AnswerCardBase width="max-content">
      <WrapperAnswerTitle answerTitle={answerData.heading}>
        <SmileIcon desc="mudar" />
      </WrapperAnswerTitle>
      <Box flex="1" display="flex" gap={4} justifyContent="space-between" alignItems="flex-start">
        <Flex gap={4}>
          <RoutineChart
            principalColor="yellow"
            data={chartData}
            tooltipTitle={intl.formatMessage(messages.chartTooltipTitle)}
          />
          <Box textAlign="center" bg="new-gray.100" width={28} height={28} pt={5} borderRadius={6}>
            {getEmoji({ felling: Number(actualFeeling?.value), size: '50px' })}
            <Text fontSize={10} color="new-gray.600">
              {intl.formatMessage(messages.subtitleFeelingOnThisWeek)}
            </Text>
          </Box>
        </Flex>
        {hasCallToAction && (
          <VStack width="100%" maxW={150} justifyContent="flex-start" alignItems="flex-start">
            <AlertIcon desc="aS" />
            <Text textAlign="left" color="new-gray.600" fontSize={14}>
              {user.firstName} está passando por um momento difícil. Que tal uma conversa?
            </Text>
          </VStack>
        )}
      </Box>
    </AnswerCardBase>
  )
}

export default FeelingAnswerCard
