import { Box, Flex, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilValue } from 'recoil'

import { StarIcon, TargetIcon, WriteIcon } from 'src/components/Icon'
import { answerDetailedAtom } from 'src/state/recoil/routine/answer'

import { routineAnswer } from '../../../types'
import { themeColor } from '../../../utils/contants'
import AnswerCardBase from '../base/answer-card'
import WrapperAnswerTitle from '../base/wrapper-answer-title'

import messages from './messages'

interface LongTextAnswerCardProperties {
  answerData: routineAnswer
}

const StyledListItem = styled.span`
  display: block;
`

const LongTextAnswerCard = ({ answerData }: LongTextAnswerCardProperties) => {
  const reference = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const answerDetailed = useRecoilValue(answerDetailedAtom)
  const intl = useIntl()

  const isDependentThat = answerDetailed.answers.find(
    (answer) => answer.id === answerData.conditional?.dependsOn,
  )

  useEffect(() => {
    if (reference.current) setWidth(reference.current?.offsetWidth)
  }, [answerDetailed])

  const answerValueThatDepends = useMemo(() => {
    if (isDependentThat?.values) {
      if (isDependentThat.type === 'value_range') {
        const lastValue = isDependentThat.values[isDependentThat.values.length - 1]
        return Number(lastValue?.value) <= 3
      }

      if (isDependentThat.type === 'road_block') {
        const lastValue = isDependentThat.values[isDependentThat.values.length - 2]
        return lastValue?.value === 'y'
      }
    }
  }, [isDependentThat])

  const justifyContent = useMemo(() => {
    if (answerValueThatDepends === false) return 'flex-start'
    if (answerValueThatDepends === true || isDependentThat?.type === 'emoji_scale')
      return 'flex-end'
    if (isDependentThat?.type === 'emoji_scale' && width > 780) return 'flex-end'
  }, [answerValueThatDepends, isDependentThat?.type, width])

  const paddingRight = useMemo(() => {
    if (isDependentThat?.type === 'emoji_scale' && width > 756) return 4
    return 0
  }, [isDependentThat?.type, width])

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
    <Box ref={reference}>
      <AnswerCardBase isDependent={Boolean(answerData.conditional)}>
        <>
          {!answerData.conditional && (
            <WrapperAnswerTitle answerTitle={answerData.heading}>
              {icons[answerData.id]}
            </WrapperAnswerTitle>
          )}

          <Flex width="100%" maxW="595px" pr={paddingRight} justifyContent={justifyContent}>
            <Box
              maxW="430px"
              w="100%"
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
          </Flex>
        </>
      </AnswerCardBase>
    </Box>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default LongTextAnswerCard
