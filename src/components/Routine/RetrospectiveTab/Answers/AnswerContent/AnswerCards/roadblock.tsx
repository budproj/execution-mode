import { Box, Circle, Divider, Flex, HStack, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { PauseIcon } from 'src/components/Icon'

import { routineAnswer } from '../../types'

import AnswerCardBase from './base/answer-card'

interface RoadblockAnswerCardProperties {
  answerData: routineAnswer
}

const RoadblockAnswerCard = ({ answerData }: RoadblockAnswerCardProperties) => {
  const intl = useIntl()

  const formatedDate = (date: Date) => {
    return `${intl.formatDate(date, { day: 'numeric' })}/${
      intl
        .formatDate(date, {
          month: 'short',
        })
        .split('.')[0]
    }`
  }

  const answerDataValues = answerData.values ?? []

  const actual = answerDataValues[answerDataValues.length - 1]

  return (
    <AnswerCardBase>
      <Flex alignItems="center" gap={6} maxWidth={225}>
        <PauseIcon
          desc="mudar"
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
          paddingX={6}
          paddingY={3}
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
          {answerData.values?.map((answer) => {
            return (
              <ListItem
                key={answer.value}
                zIndex={3}
                display="flex"
                flexDir="column"
                alignItems="center"
              >
                {answer.value === 'y' ? (
                  <PauseIcon
                    desc="qweq"
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
                    <span>&#10003;</span>
                  </Circle>
                )}
                <Text fontSize={10} color="new-gray.600">
                  {formatedDate(new Date(answer.timestamp))}
                </Text>
              </ListItem>
            )
          })}
        </List>
        <Flex gap={4}>
          <Box textAlign="center" bg="new-gray.100" paddingX={6} paddingY={3} borderRadius={6}>
            <Text fontSize={18} fontWeight="bold" color="purple.500">
              {actual.value === 'y' ? 'Sim!' : 'Ok'}
            </Text>
            <Text fontSize={10} color="new-gray.600">
              Essa semana
            </Text>
          </Box>
        </Flex>
      </HStack>
    </AnswerCardBase>
  )
}

export default RoadblockAnswerCard
