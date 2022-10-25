import { Button, Circle, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { format, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
// Import { useSetRecoilState } from 'recoil'

import { ArrowRight, GraphicIcon } from 'src/components/Icon'
import { answerHistory } from 'src/components/Routine/RetrospectiveTab/Answers/types'
import { getDateFromUTCDate } from 'src/components/Routine/RetrospectiveTab/Answers/utils'
// Import { routineDatesRangeAtom } from 'src/state/recoil/routine/routine-dates-range'

import AnswerCardBase from '../base/answer-card'

import messages from './messages'

interface HistoryAnswersProperties {
  answers: answerHistory[]
}

const StyledButton = styled(Button)`
  background: #eef2fc;
  border-radius: 10px 0px 2px 10px;
  width: 42px;
  height: 40px;
`

const HistoryAnswers = ({ answers }: HistoryAnswersProperties) => {
  const intl = useIntl()
  const router = useRouter()

  const formatedDate = (date: Date) => {
    return `${intl.formatDate(date, { day: 'numeric', timeZone: 'utc' })}/${
      intl
        .formatDate(date, {
          month: 'short',
        })
        .split('.')[0]
    }`
  }

  const lastRoutine = answers[answers.length - 1]
  const previousRoutineAnswered = answers[answers.length - 3]

  const handlePushToAnswer = (answer: answerHistory) => {
    if (answer.id) {
      const parsedFinishDate = parseISO(answer.finishDate)
      const parsedStartDate = parseISO(answer.startDate)

      router.push(
        {
          query: {
            ...(router?.query ?? {}),
            before: format(getDateFromUTCDate(parsedFinishDate), 'dd/MM/yyyy'),
            after: format(getDateFromUTCDate(parsedStartDate), 'dd/MM/yyyy'),
            answerId: answer.id,
          },
        },
        undefined,
        { shallow: true },
      )
    }
  }

  return (
    <AnswerCardBase paddingTop={0}>
      <Flex alignItems="center" gap={6} maxWidth={265}>
        <GraphicIcon desc={intl.formatMessage(messages.graphicIconDesc)} />
        <Text fontSize={14} color="new-gray.600">
          {intl.formatMessage(messages.historyAnswersCardTitle)}:
        </Text>
      </Flex>
      <Flex gap={4}>
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
            const circleSize = index === answerHistory.length - 2 ? 7 : 6
            const fontSize = index === answerHistory.length - 2 ? 14 : 12
            const bgColor = index === answerHistory.length - 2 ? 'brand.500' : 'brand.300'

            return (
              index < answerHistory.length - 1 && (
                <ListItem
                  key={`${new Date(answer.finishDate).getTime()}.${Math.random()}`}
                  zIndex={3}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  onClick={() => handlePushToAnswer(answer)}
                >
                  <Circle
                    bg={answer.id ? bgColor : 'new-gray.500'}
                    cursor={answer.id ? 'pointer' : 'default'}
                    size={circleSize}
                    lineHeight="none"
                    color="white"
                    fontSize={fontSize}
                    fontWeight="black"
                  >
                    {answer.id ? <span>&#10003;</span> : <span>&#x2715;</span>}
                  </Circle>
                  <Text fontSize={10} color="new-gray.600">
                    {formatedDate(parseISO(answer.startDate))}
                  </Text>
                </ListItem>
              )
            )
          })}
        </List>
        <Flex gap={3} width={28}>
          <StyledButton
            isDisabled={!previousRoutineAnswered.id}
            onClick={() => handlePushToAnswer(previousRoutineAnswered)}
          >
            <ArrowRight
              fill="new-gray.700"
              style={{ transform: 'rotate(180deg)' }}
              desc={intl.formatMessage(messages.arrowRightIcon)}
            />
          </StyledButton>
          <StyledButton
            isDisabled={!lastRoutine.id}
            style={{ transform: 'rotate(180deg)' }}
            onClick={() => handlePushToAnswer(lastRoutine)}
          >
            <ArrowRight
              fill="new-gray.700"
              style={{ transform: 'rotate(180deg)' }}
              desc={intl.formatMessage(messages.arrowLeftIcon)}
            />
          </StyledButton>
        </Flex>
      </Flex>
    </AnswerCardBase>
  )
}

export default HistoryAnswers
