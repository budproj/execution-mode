import { Box, Skeleton, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { StarIcon, TargetIcon, WriteIcon } from 'src/components/Icon'

import { routineAnswer } from '../../../types'
import { themeColor } from '../../../utils/contants'
import AnswerCardBase from '../base/answer-card'
import WrapperAnswerTitle from '../base/wrapper-answer-title'

import messages from './messages'

interface LongTextAnswerCardProperties {
  answerData: routineAnswer
  isLoaded?: boolean
}

const StyledListItem = styled.span`
  display: block;
`

const LongTextAnswerCard = ({ answerData, isLoaded }: LongTextAnswerCardProperties) => {
  const intl = useIntl()

  const reference = useRef<HTMLDivElement>(null)

  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (reference.current) setWidth(reference.current?.offsetWidth)
  }, [])

  const answerValueThatDepends = useMemo(() => {
    if (answerData.dependsThat?.values) {
      if (answerData.dependsThat?.type === 'value_range') {
        const lastValue = answerData.dependsThat?.values[answerData.dependsThat?.values.length - 1]
        return Number(lastValue?.value) <= 3
      }

      if (answerData.dependsThat?.type === 'road_block') {
        const lastValue = answerData.dependsThat?.values[answerData.dependsThat?.values.length - 2]
        return lastValue?.value === 'y'
      }
    }
  }, [answerData.dependsThat])

  const justifyContent = useMemo(() => {
    if (answerValueThatDepends === false) return 'flex-start'
    if (answerValueThatDepends === true || answerData.dependsThat?.type === 'emoji_scale')
      return 'flex-end'
    if (answerData.dependsThat?.type === 'emoji_scale' && width > 780) return 'flex-end'
  }, [answerValueThatDepends, answerData.dependsThat?.type, width])

  const paddingRight = useMemo(() => {
    if (answerData.dependsThat?.type === 'emoji_scale' && width > 756) return 0
    return 0
  }, [answerData.dependsThat?.type, width])

  const icons: Record<string, JSX.Element> = {
    '95b84e67-d5b6-4fcf-938a-b4c9897596cb': (
      <StarIcon desc={intl.formatMessage(messages.starIconDesc)} withCircle={false} />
    ),
    'a1d5b993-9430-40bb-8f0f-47cda69720b9': (
      <TargetIcon desc={intl.formatMessage(messages.targetIconDesc)} />
    ),
    'fd7c26dd-38e3-41e7-b24a-78030653dc23': (
      <WriteIcon desc={intl.formatMessage(messages.writeIconDesc)} />
    ),
  }

  const theme = themeColor(answerData.dependsThat?.type ?? '')

  return answerData.value ? (
    <Box ref={reference}>
      <AnswerCardBase isDependent={Boolean(answerData.conditional)}>
        <>
          {!answerData.conditional && (
            <WrapperAnswerTitle answerTitle={answerData.heading}>
              {icons[answerData.id]}
            </WrapperAnswerTitle>
          )}
          <Skeleton
            display="flex"
            isLoaded={isLoaded}
            width="100%"
            pr={paddingRight}
            justifyContent={justifyContent}
          >
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
          </Skeleton>
        </>
      </AnswerCardBase>
    </Box>
  ) : // eslint-disable-next-line unicorn/no-null
  null
}

export default LongTextAnswerCard
