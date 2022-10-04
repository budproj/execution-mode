import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { SmileIcon } from 'src/components/Icon'
import { useGetEmoji } from 'src/components/Routine/hooks'

import { routineAnswer } from '../../../types'
import AnswerCardBase from '../base/answer-card'
import RoutineChart from '../base/charts'

import messages from './messages'

interface FeelingAnswerCardProperties {
  answerData: routineAnswer
}

const FeelingAnswerCard = ({ answerData }: FeelingAnswerCardProperties) => {
  const { getEmoji } = useGetEmoji()

  const intl = useIntl()

  const chartData = answerData.values ?? []

  const actualFeeling = chartData[chartData.length - 1]

  return (
    <AnswerCardBase>
      <Flex alignItems="center" gap={6} maxWidth={265}>
        <SmileIcon desc="mudar" />
        <Text fontSize={14} color="new-gray.600">
          {answerData.heading}
        </Text>
      </Flex>

      <Flex gap={4}>
        <RoutineChart
          principalColor="yellow"
          data={chartData}
          tooltipTitle={intl.formatMessage(messages.chartTooltipTitle)}
        />
        <Box textAlign="center" bg="new-gray.100" width={28} height={28} pt={5} borderRadius={6}>
          {getEmoji({ felling: Number(actualFeeling?.value), size: '50px' })}
          <Text fontSize={10} color="new-gray.600">
            Essa semana
          </Text>
        </Box>
      </Flex>
    </AnswerCardBase>
  )
}

export default FeelingAnswerCard
