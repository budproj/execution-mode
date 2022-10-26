import { Box, Flex, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { StarIcon, TargetIcon, WriteIcon } from 'src/components/Icon'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { routineAnswer } from '../../../types'
import { themeColor } from '../../../utils/contants'
import AnswerCardBase from '../base/answer-card'

import messages from './messages'

interface LongTextAnswerCardProperties {
  answerData: routineAnswer
}

const StyledListItem = styled.span`
  display: block;
`

const LongTextAnswerCard = ({ answerData }: LongTextAnswerCardProperties) => {
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const intl = useIntl()

  const isDependentThat = answerDetailed.answers.find(
    (answer) => answer.id === answerData.conditional?.dependsOn,
  )

  const icons: Record<string, JSX.Element> = {
    '95b84e67-d5b6-4fcf-938a-b4c9897596cb': (
      <StarIcon desc={intl.formatMessage(messages.starIconDesc)} />
    ),
    'a1d5b993-9430-40bb-8f0f-47cda69720b9': (
      <TargetIcon desc={intl.formatMessage(messages.targetIconDesc)} />
    ),
    'fd7c26dd-38e3-41e7-b24a-78030653dc23': (
      <WriteIcon desc={intl.formatMessage(messages.writeIconDesc)} />
    ),
  }

  const theme = themeColor(isDependentThat?.type ?? '')

  return answerData.value ? (
    <AnswerCardBase isDependent={Boolean(answerData.conditional)}>
      <>
        {!answerData.conditional && (
          <Flex alignItems="center" gap={6} maxWidth={265}>
            {icons[answerData.id]}
            <Text fontSize={14} color="new-gray.600">
              {answerData.heading}
            </Text>
          </Flex>
        )}

        <Box
          maxW={432}
          width="100%"
          bg="new-gray.100"
          borderRadius={6}
          fontSize={14}
          height="fit-content"
          p={4}
        >
          {answerData.conditional && (
            <Text color={theme} fontWeight="medium">
              {answerData.heading}
            </Text>
          )}

          <Text color="new-gray.900" fontWeight="normal">
            {answerData.value.split('\n').map((line) => (
              <StyledListItem key={line}>{line}</StyledListItem>
            ))}
          </Text>
        </Box>
      </>
    </AnswerCardBase>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default LongTextAnswerCard
