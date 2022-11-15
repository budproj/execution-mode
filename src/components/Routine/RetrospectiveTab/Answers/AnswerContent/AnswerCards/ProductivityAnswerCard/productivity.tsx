import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { AlertIcon, BagIcon } from 'src/components/Icon'
import { User } from 'src/components/User/types'

import { routineAnswer } from '../../../types'
import AnswerCardBase from '../base/answer-card'
import RoutineChart from '../base/charts'
import WrapperAnswerTitle from '../base/wrapper-answer-title'

import messages from './messages'

interface ProductivityAnswerCardProperties {
  answerData: routineAnswer
  user: Partial<User>
}

const ProductivityAnswerCard = ({ answerData, user }: ProductivityAnswerCardProperties) => {
  const chartData = answerData.values ?? []
  const intl = useIntl()

  const actualProductivity = chartData[chartData.length - 1]

  const hasCallToAction = actualProductivity.value <= '3'

  return (
    <AnswerCardBase>
      <WrapperAnswerTitle answerTitle={answerData.heading}>
        <BagIcon desc="mudar" />
      </WrapperAnswerTitle>

      <Box flex="1" display="flex" gap={4} justifyContent="space-between" alignItems="flex-start">
        <Flex position="relative" gap={4}>
          <RoutineChart
            principalColor="brand"
            data={chartData}
            tooltipTitle={intl.formatMessage(messages.chartTooltipTitle)}
          />
          <Box textAlign="center" bg="new-gray.100" width={28} height={28} borderRadius={6}>
            <span style={{ fontSize: 48, color: '#6F6EFF', fontWeight: 500 }}>
              {actualProductivity?.value}
            </span>
            <Text fontSize={10} color="new-gray.600">
              {intl.formatMessage(messages.subtitleProductivityOnThisWeek)}
            </Text>
          </Box>
        </Flex>
        {hasCallToAction && (
          <VStack
            position="absolute"
            right={-48}
            width="100%"
            maxW={150}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <AlertIcon desc="aS" />
            <Text textAlign="left" color="new-gray.600" fontSize={14}>
              {intl.formatMessage(messages.productivityCallToActionMessage, {
                user: user.firstName,
                gender: user.gender,
              })}
            </Text>
          </VStack>
        )}
      </Box>
    </AnswerCardBase>
  )
}

export default ProductivityAnswerCard
