import { Circle, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react'
import React from 'react'
import { useIntl } from 'react-intl'

import { GraphicIcon } from 'src/components/Icon'

import { answerHistory } from '../../types'

import AnswerCardBase from './base/answer-card'

interface HistoryAnswersProperties {
  answers: answerHistory[]
}

const HistoryAnswers = ({ answers }: HistoryAnswersProperties) => {
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

  return (
    <AnswerCardBase paddingTop={0}>
      <Flex alignItems="center" gap={6} maxWidth={225}>
        <GraphicIcon desc="mudar" />
        <Text fontSize={14} color="new-gray.600">
          Histórico de respostas:
        </Text>
      </Flex>

      <List
        display="flex"
        gap={10}
        bg="new-gray.100"
        borderRadius={6}
        w="320px"
        height={61}
        paddingX={6}
        paddingY={4}
        alignItems="center"
        position="relative"
        justifyContent="center"
      >
        <Divider
          position="absolute"
          w={280}
          top={6}
          border="2px solid"
          bg="new-gray.400"
          left={0}
          zIndex={2}
        />
        {answers.map((answer, index, answerHistory) => {
          const circleSize = index === answerHistory.length - 1 ? 7 : 6
          const fontSize = index === answerHistory.length - 1 ? 14 : 12
          const bgColor = index === answerHistory.length - 1 ? 'brand.500' : 'brand.300'

          return (
            <ListItem
              key={answer.id}
              zIndex={3}
              display="flex"
              flexDir="column"
              alignItems="center"
            >
              {answer.id ? (
                <Circle
                  size={circleSize}
                  lineHeight="none"
                  color="white"
                  fontSize={fontSize}
                  fontWeight="black"
                  bg={bgColor}
                >
                  <span>&#10003;</span>
                </Circle>
              ) : (
                <Circle
                  bg="new-gray.500"
                  size={circleSize}
                  lineHeight="none"
                  color="white"
                  fontSize={fontSize}
                  fontWeight="black"
                >
                  <span>&#x2715;</span>
                </Circle>
              )}
              <Text fontSize={10} color="new-gray.600">
                {formatedDate(new Date(answer.routinePeriodStartDate))}
              </Text>
            </ListItem>
          )
        })}
      </List>
    </AnswerCardBase>
  )
}

export default HistoryAnswers
