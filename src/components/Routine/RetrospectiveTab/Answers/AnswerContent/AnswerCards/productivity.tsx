import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { BagIcon } from 'src/components/Icon'

import { routineAnswer } from '../../types'

import AnswerCardBase from './base/answer-card'
import RoutineChart from './base/charts'

interface ProductivityAnswerCardProperties {
  answerData: routineAnswer
}

const ProductivityAnswerCard = ({ answerData }: ProductivityAnswerCardProperties) => {
  const chartData = answerData.values ?? []

  const actualProductivity = chartData[chartData.length - 1]

  return (
    <AnswerCardBase>
      <Flex alignItems="center" gap={6} maxWidth={225}>
        <BagIcon desc="mudar" />
        <Text fontSize={14} color="new-gray.600">
          {answerData.heading}
        </Text>
      </Flex>

      <Flex gap={4}>
        <RoutineChart principalColor="brand" data={chartData} />
        <Box textAlign="center" bg="new-gray.100" width={28} height={28} borderRadius={6}>
          <span style={{ fontSize: 48, color: '#6F6EFF', fontWeight: 500 }}>
            {actualProductivity?.value}
          </span>
          <Text fontSize={10} color="new-gray.600">
            Essa semana
          </Text>
        </Box>
      </Flex>
    </AnswerCardBase>
  )
}

export default ProductivityAnswerCard
