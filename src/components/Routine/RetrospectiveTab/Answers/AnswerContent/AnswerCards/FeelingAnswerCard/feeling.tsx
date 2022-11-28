import { Box, Flex, Skeleton, Text, VStack } from '@chakra-ui/react'
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
  isLoaded?: boolean
}

const FeelingAnswerCard = ({ answerData, user, isLoaded }: FeelingAnswerCardProperties) => {
  const { getEmoji } = useGetEmoji()

  const intl = useIntl()

  const chartData = answerData.values ?? []

  const actualFeeling = chartData[chartData.length - 1]

  const hasCallToAction = actualFeeling.value <= '2'

  return (
    <AnswerCardBase>
      <WrapperAnswerTitle answerTitle={answerData.heading}>
        <SmileIcon desc="mudar" />
      </WrapperAnswerTitle>
      <Skeleton isLoaded={isLoaded}>
        <Box flex="1" display="flex" justifyContent="space-between" alignItems="flex-start">
          <Flex gap={4}>
            <RoutineChart
              principalColor="yellow"
              data={chartData}
              tooltipTitle={intl.formatMessage(messages.chartTooltipTitle)}
            />
            <Box
              textAlign="center"
              bg="new-gray.100"
              width={28}
              height={28}
              pt={5}
              borderRadius={6}
            >
              {getEmoji({ felling: Number(actualFeeling?.value), size: '50px' })}
              <Text fontSize={10} color="new-gray.600">
                {intl.formatMessage(messages.subtitleFeelingOnThisWeek)}
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
                {intl.formatMessage(messages.feelingCallToActionMessage, { user: user.firstName })}
              </Text>
            </VStack>
          )}
        </Box>
      </Skeleton>
    </AnswerCardBase>
  )
}

export default FeelingAnswerCard
