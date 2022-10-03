import { Button, Circle, Divider, Flex, List, ListItem, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'

import { IntlLink } from 'src/components/Base'
import { ArrowRight, GraphicIcon } from 'src/components/Icon'
import { Team } from 'src/components/Team/types'

import { answerHistory } from '../../types'

import AnswerCardBase from './base/answer-card'

interface HistoryAnswersProperties {
  answers: answerHistory[]
  teamId: Team['id']
}

const StyledButton = styled(Button)`
  background: #eef2fc;
  border-radius: 10px 0px 2px 10px;
  width: 42px;
  height: 40px;
`

const HistoryAnswers = ({ answers, teamId }: HistoryAnswersProperties) => {
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

  return (
    <AnswerCardBase paddingTop={0}>
      <Flex alignItems="center" gap={6} maxWidth={265}>
        <GraphicIcon desc="mudar" />
        <Text fontSize={14} color="new-gray.600">
          Histórico de respostas:
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
            const circleSize = index === answerHistory.length - 1 ? 7 : 6
            const fontSize = index === answerHistory.length - 1 ? 14 : 12
            const bgColor = index === answerHistory.length - 1 ? 'brand.500' : 'brand.300'

            return (
              <ListItem
                key={`${new Date(answer.finishDate).getTime()}.${Math.random()}`}
                zIndex={3}
                display="flex"
                flexDir="column"
                alignItems="center"
              >
                {answer.id ? (
                  <IntlLink
                    passHref
                    href={`/explore/${teamId}#retrospectiva?answerId=${answer.id}`}
                  >
                    <Circle
                      size={circleSize}
                      lineHeight="none"
                      color="white"
                      fontSize={fontSize}
                      fontWeight="black"
                      bg={bgColor}
                      cursor="pointer"
                    >
                      <span>&#10003;</span>
                    </Circle>
                  </IntlLink>
                ) : (
                  <Circle
                    bg="new-gray.500"
                    size={circleSize}
                    lineHeight="none"
                    color="white"
                    cursor="default"
                    fontSize={fontSize}
                    fontWeight="black"
                  >
                    <span>&#x2715;</span>
                  </Circle>
                )}
                <Text fontSize={10} color="new-gray.600">
                  {formatedDate(answer.startDate)}
                </Text>
              </ListItem>
            )
          })}
        </List>
        <Flex gap={3} width={28}>
          <StyledButton>
            <ArrowRight fill="new-gray.700" style={{ transform: 'rotate(180deg)' }} desc="sdas" />
          </StyledButton>
          <StyledButton style={{ transform: 'rotate(180deg)' }}>
            <ArrowRight fill="new-gray.700" style={{ transform: 'rotate(180deg)' }} desc="sdas" />
          </StyledButton>
        </Flex>
      </Flex>
    </AnswerCardBase>
  )
}

export default HistoryAnswers
