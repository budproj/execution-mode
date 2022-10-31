import { Circle, Divider, Flex, HStack, List, ListItem, Text, VStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { parseISO } from 'date-fns'
import React from 'react'
import { useIntl } from 'react-intl'

import { PauseIcon } from 'src/components/Icon'
import CheckBoldIcon from 'src/components/Icon/CheckBold'

import { routineAnswer } from '../../../types'
import { getDateFromUTCDate } from '../../../utils'
import AnswerCardBase from '../base/answer-card'

import messages from './messages'

const DashIcon = styled.span`
  display: inline-block;
  background-color: white;
  width: 8px;
  height: 2px;
  border-radius: 5px;
`

interface RoadblockAnswerCardProperties {
  answerData: routineAnswer
}

const RoadblockAnswerCard = ({ answerData }: RoadblockAnswerCardProperties) => {
  const intl = useIntl()

  const formatedDate = (date: Date) => {
    return `${intl.formatDate(date, { day: 'numeric', timeZone: 'utc' })}/${
      intl
        .formatDate(date, {
          month: 'short',
        })
        .split('.')[0]
    }`
  }

  const answerDataValues = answerData.values ?? []
  const currentAnswer = answerDataValues[answerDataValues.length - 2]

  return (
    <AnswerCardBase>
      <Flex alignItems="center" gap={6} maxWidth={265}>
        <PauseIcon
          desc={intl.formatMessage(messages.pauseIconDesc)}
          columnBgColor="#8491B0"
          fill="new-gray.400"
          width="40px"
          height="40px"
        />
        <Text fontSize={14} color="new-gray.600">
          {answerData.heading}
        </Text>
      </Flex>

      <HStack height={61} spacing={4}>
        <List
          display="flex"
          gap={10}
          bg="new-gray.100"
          borderRadius={6}
          w="320px"
          paddingX={6}
          paddingY={3}
          height="100%"
          alignItems="center"
          position="relative"
          justifyContent="center"
        >
          <Divider
            position="absolute"
            top={6}
            border="2px solid"
            bg="new-gray.400"
            zIndex={2}
            width="80%"
          />
          {answerDataValues.slice(0, -1).map((answer) => {
            return (
              <ListItem
                key={answer.timestamp}
                zIndex={3}
                display="flex"
                flexDir="column"
                alignItems="center"
              >
                {answer.value ? (
                  answer.value === 'y' ? (
                    <PauseIcon
                      desc={intl.formatMessage(messages.pauseIconDesc)}
                      w={7}
                      h={7}
                      coloumnStrokeWidth={0.2}
                      circleStrokeWidth={0}
                      stroke="white"
                    />
                  ) : (
                    <Circle
                      bg="new-gray.500"
                      size={6}
                      lineHeight="none"
                      color="white"
                      fontSize={10}
                      fontWeight="black"
                    >
                      <CheckBoldIcon desc="tete" fill="white" />
                    </Circle>
                  )
                ) : (
                  <Circle
                    bg="new-gray.500"
                    size={6}
                    lineHeight="none"
                    color="white"
                    cursor="default"
                    fontSize={10}
                    fontWeight="black"
                  >
                    <DashIcon />
                  </Circle>
                )}
                <Text fontSize={10} color="new-gray.600">
                  {formatedDate(getDateFromUTCDate(parseISO(answer.timestamp)))}
                </Text>
              </ListItem>
            )
          })}
        </List>
        <VStack
          alignItems="center"
          justifyContent="center"
          height="100%"
          bg="new-gray.100"
          width={28}
          borderRadius={6}
        >
          <Text fontSize={18} lineHeight={0} fontWeight="bold" color="purple.500">
            {currentAnswer?.value === 'y'
              ? intl.formatMessage(messages.barrierStatusOnThisWeek)
              : 'Ok'}
          </Text>
          <Text lineHeight={0} pt={4} fontSize={10} color="new-gray.600">
            {intl.formatMessage(messages.subtitleBarrierStatusOnThisWeek)}
          </Text>
        </VStack>
      </HStack>
    </AnswerCardBase>
  )
}

export default RoadblockAnswerCard
